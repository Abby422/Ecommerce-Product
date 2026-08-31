import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoCheckmark, IoLockClosed } from 'react-icons/io5';
import './Checkout.css';
import { api, errorMessage } from '../../lib/api';
import { useAsync } from '../../lib/useAsync';
import { formatMoney } from '../../lib/format';
import { onImageError } from '../../lib/placeholder';
import { clearCart, selectCartItems, selectCartTotal } from '../../redux/slices/cartReducer';
import { selectUser, selectIsAuthenticated } from '../../redux/slices/authReducer';
import { ErrorMessage } from '../common/Status';

const STEPS = ['Address', 'Delivery', 'Payment'];

const EMPTY_ADDRESS = {
  fullName: '',
  email: '',
  line1: '',
  line2: '',
  city: '',
  postcode: '',
  country: 'Kenya',
  phone: '',
};

const EMPTY_PAYMENT = { cardName: '', cardNumber: '', expiry: '', cvc: '' };

const digits = (value) => value.replace(/\D/g, '');

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [step, setStep] = useState(0);
  const [address, setAddress] = useState({
    ...EMPTY_ADDRESS,
    fullName: user?.Name ?? '',
    email: user?.Email ?? user?.email ?? '',
  });
  const [payment, setPayment] = useState(EMPTY_PAYMENT);
  const [methodId, setMethodId] = useState('standard');
  const [promoInput, setPromoInput] = useState('');
  const [promo, setPromo] = useState(null);
  const [promoError, setPromoError] = useState(null);
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { data: methods } = useAsync(() => api.getShippingMethods(), [], { initialData: [] });
  const threshold = api.getFreeShippingThreshold();

  const method = methods.find((m) => m.id === methodId) ?? methods[0];

  const totals = useMemo(() => {
    // Free shipping covers the standard service only. Upgrading to express or
    // white-glove still costs the difference — waiving it entirely would let a
    // large order take the fastest courier for nothing.
    const qualifiesFree = subtotal >= threshold || promo?.type === 'shipping';
    const standard = methods.find((m) => m.id === 'standard');
    const listPrice = method?.price ?? 0;
    const waived = qualifiesFree ? (standard?.price ?? 0) : 0;
    const shipping = Math.max(0, listPrice - waived);

    let discount = 0;
    if (promo?.type === 'percent') discount = Math.round(subtotal * (promo.value / 100));
    if (promo?.type === 'fixed') discount = promo.value;
    discount = Math.min(discount, subtotal);

    return { shipping, discount, total: subtotal + shipping - discount, qualifiesFree };
  }, [subtotal, threshold, promo, method, methods]);

  if (items.length === 0 && !placing) {
    return (
      <div className="checkout checkout--empty">
        <h1>Your cart is empty</h1>
        <p>Add something before checking out.</p>
        <Link to="/shop" className="button-primary">
          Browse the shop
        </Link>
      </div>
    );
  }

  const validateAddress = () => {
    const next = {};
    if (!address.fullName.trim()) next.fullName = 'Enter the name for the delivery.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(address.email)) next.email = 'Enter a valid email.';
    if (!address.line1.trim()) next.line1 = 'Enter a street address.';
    if (!address.city.trim()) next.city = 'Enter a city.';
    if (!address.postcode.trim()) next.postcode = 'Enter a postcode.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validatePayment = () => {
    const next = {};
    if (!payment.cardName.trim()) next.cardName = 'Enter the name on the card.';
    if (digits(payment.cardNumber).length < 15) next.cardNumber = 'Enter a 16-digit card number.';
    if (!/^\d{2}\s*\/\s*\d{2}$/.test(payment.expiry)) next.expiry = 'Use MM/YY.';
    if (digits(payment.cvc).length < 3) next.cvc = 'Enter the 3-digit code.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const applyPromo = async (event) => {
    event.preventDefault();
    setPromoError(null);
    try {
      const found = await api.applyPromo(promoInput);
      if (found.minimum && subtotal < found.minimum) {
        setPromoError(`That code needs a subtotal over ${formatMoney(found.minimum)}.`);
        return;
      }
      setPromo(found);
      setPromoInput('');
    } catch (err) {
      setPromoError(errorMessage(err, 'That code is not recognised.'));
    }
  };

  const next = () => {
    if (step === 0 && !validateAddress()) return;
    setErrors({});
    setStep((s) => s + 1);
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    if (!validatePayment()) return;
    setPlacing(true);
    setSubmitError(null);
    try {
      const order = await api.placeOrder({
        userId: user?.User_Id ?? null,
        items,
        shipping: totals.shipping,
        discount: totals.discount,
        address,
        shippingMethod: method?.name ?? 'Standard',
      });
      dispatch(clearCart());
      navigate(`/order/${order.id}`, { replace: true, state: { justPlaced: true } });
    } catch (err) {
      setSubmitError(errorMessage(err, 'We could not place your order.'));
      setPlacing(false);
    }
  };

  const field = (name, label, props = {}) => (
    <div className={`field${errors[name] ? ' has-error' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={props.source?.[name] ?? address[name]}
        onChange={(event) =>
          (props.setter ?? setAddress)((current) => ({ ...current, [name]: event.target.value }))
        }
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        {...props.input}
      />
      {errors[name] && (
        <p className="field__error" id={`${name}-error`}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="checkout">
      <header className="checkout__header">
        <h1>Checkout</h1>
        <ol className="steps" aria-label="Checkout progress">
          {STEPS.map((label, index) => (
            <li
              key={label}
              className={index === step ? 'is-current' : index < step ? 'is-done' : undefined}
              aria-current={index === step ? 'step' : undefined}
            >
              <span className="steps__marker">{index < step ? <IoCheckmark /> : index + 1}</span>
              {label}
            </li>
          ))}
        </ol>
      </header>

      <div className="checkout__layout">
        <div className="checkout__main">
          {!isAuthenticated && (
            <p className="checkout__guest">
              Checking out as a guest. <Link to="/login">Sign in</Link> to save this order to an
              account.
            </p>
          )}

          {step === 0 && (
            <section className="panel">
              <h2>Delivery address</h2>
              <div className="field-grid">
                {field('fullName', 'Full name', { input: { autoComplete: 'name' } })}
                {field('email', 'Email', { input: { type: 'email', autoComplete: 'email' } })}
                {field('line1', 'Address', { input: { autoComplete: 'address-line1' } })}
                {field('line2', 'Apartment, suite (optional)', {
                  input: { autoComplete: 'address-line2' },
                })}
                {field('city', 'City', { input: { autoComplete: 'address-level2' } })}
                {field('postcode', 'Postcode', { input: { autoComplete: 'postal-code' } })}
                {field('country', 'Country', { input: { autoComplete: 'country-name' } })}
                {field('phone', 'Phone (optional)', { input: { type: 'tel', autoComplete: 'tel' } })}
              </div>
              <button type="button" className="button-primary" onClick={next}>
                Continue to delivery
              </button>
            </section>
          )}

          {step === 1 && (
            <section className="panel">
              <h2>Delivery method</h2>
              <div className="methods">
                {methods.map((option) => {
                  const standard = methods.find((m) => m.id === 'standard');
                  const payable = totals.qualifiesFree
                    ? Math.max(0, option.price - (standard?.price ?? 0))
                    : option.price;
                  return (
                    <label
                      key={option.id}
                      className={`method${methodId === option.id ? ' is-selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={methodId === option.id}
                        onChange={() => setMethodId(option.id)}
                      />
                      <span className="method__body">
                        <span className="method__name">{option.name}</span>
                        <span className="method__estimate">{option.estimate}</span>
                      </span>
                      <span className="method__price">
                        {payable === 0 ? 'Free' : formatMoney(payable)}
                        {totals.qualifiesFree && payable > 0 && (
                          <span className="method__was">{formatMoney(option.price)}</span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="panel__actions">
                <button type="button" className="button-secondary" onClick={() => setStep(0)}>
                  Back
                </button>
                <button type="button" className="button-primary" onClick={next}>
                  Continue to payment
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <form className="panel" onSubmit={placeOrder}>
              <h2>Payment</h2>
              <p className="panel__note">
                <IoLockClosed /> This is a demo. Do not enter a real card — nothing is transmitted
                anywhere, and any 16 digits will pass.
              </p>

              <div className="field-grid">
                {field('cardName', 'Name on card', {
                  source: payment,
                  setter: setPayment,
                  input: { autoComplete: 'cc-name' },
                })}
                {field('cardNumber', 'Card number', {
                  source: payment,
                  setter: setPayment,
                  input: { inputMode: 'numeric', placeholder: '4242 4242 4242 4242', maxLength: 19 },
                })}
                {field('expiry', 'Expiry', {
                  source: payment,
                  setter: setPayment,
                  input: { placeholder: 'MM/YY', maxLength: 5 },
                })}
                {field('cvc', 'CVC', {
                  source: payment,
                  setter: setPayment,
                  input: { inputMode: 'numeric', placeholder: '123', maxLength: 4 },
                })}
              </div>

              {submitError && <ErrorMessage message={submitError} />}

              <div className="panel__actions">
                <button type="button" className="button-secondary" onClick={() => setStep(1)}>
                  Back
                </button>
                <button type="submit" className="button-primary" disabled={placing}>
                  {placing ? 'Placing order…' : `Pay ${formatMoney(totals.total)}`}
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="checkout__summary">
          <h2>Order summary</h2>

          <ul className="summary-items">
            {items.map((item) => (
              <li key={item.Product_id}>
                <span className="summary-items__thumb">
                  <img src={item.Product_image} alt="" onError={onImageError} />
                  <span className="summary-items__qty">{item.quantity}</span>
                </span>
                <span className="summary-items__name">{item.Product_name}</span>
                <span>{formatMoney(item.Product_price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <form className="promo" onSubmit={applyPromo}>
            <label className="visually-hidden" htmlFor="promo">
              Promo code
            </label>
            <input
              id="promo"
              placeholder="Promo code"
              value={promoInput}
              onChange={(event) => setPromoInput(event.target.value)}
            />
            <button type="submit" className="button-secondary">
              Apply
            </button>
          </form>
          {promoError && <p className="field__error">{promoError}</p>}
          {promo && (
            <p className="promo__applied">
              <IoCheckmark /> {promo.code} — {promo.description}
              <button type="button" className="link-button" onClick={() => setPromo(null)}>
                Remove
              </button>
            </p>
          )}

          <dl className="totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{formatMoney(subtotal)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>{totals.shipping === 0 ? 'Free' : formatMoney(totals.shipping)}</dd>
            </div>
            {totals.discount > 0 && (
              <div className="totals__discount">
                <dt>Discount</dt>
                <dd>−{formatMoney(totals.discount)}</dd>
              </div>
            )}
            <div className="totals__grand">
              <dt>Total</dt>
              <dd>{formatMoney(totals.total)}</dd>
            </div>
          </dl>

          {!totals.qualifiesFree && (
            <p className="summary-note">
              Spend {formatMoney(threshold - subtotal)} more for free standard shipping.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
