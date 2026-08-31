import { IMG } from './images';

export const CATEGORIES = [
  { slug: 'living-room', name: 'Living Room' },
  { slug: 'bedroom', name: 'Bedroom' },
  { slug: 'kitchen-dining', name: 'Kitchen & Dining' },
  { slug: 'lighting', name: 'Lighting' },
  { slug: 'decor', name: 'Decor' },
  { slug: 'storage', name: 'Storage' },
];

// price is what you pay; listPrice, when higher, is what it was.
const p = (
  id,
  name,
  category,
  price,
  listPrice,
  quantity,
  image,
  gallery,
  rating,
  reviewCount,
  description,
  details,
) => ({
  Product_id: id,
  Product_name: name,
  Category: category,
  Product_price: price,
  List_price: listPrice,
  Quantity: quantity,
  Product_image: image,
  Product_images: [image, ...gallery],
  Rating: rating,
  Review_count: reviewCount,
  Product_description: description,
  Details: details,
  Discount: listPrice > price ? listPrice - price : 0,
  IsAvailable: quantity > 0,
  isDeleted: false,
  SKU: `SJ-${String(id).padStart(4, '0')}`,
});

export const PRODUCTS = [
  // ---- Living Room ----
  p(1, 'Linen Accent Armchair', 'living-room', 640, 780, 12, IMG.armchairCream,
    [IMG.livingPastel, IMG.livingRounded], 4.6, 84,
    'A low-slung lounge chair in oatmeal linen over a solid oak frame. The cushions are feather-wrapped foam, so it keeps its shape through years of Sunday afternoons.',
    { Material: 'Belgian linen, solid oak', Dimensions: 'W 78 × D 82 × H 74 cm', Assembly: 'Legs attach with four bolts', Warranty: '5 years on the frame' }),

  p(2, 'Emerald Velvet Sofa', 'living-room', 1180, 1180, 5, IMG.sofaGreen,
    [IMG.livingRed, IMG.livingWarm], 4.8, 156,
    'A three-seater in deep emerald cotton velvet on tapered brass-capped legs. Firm enough to sit properly, soft enough that nobody leaves.',
    { Material: 'Cotton velvet, kiln-dried hardwood', Dimensions: 'W 210 × D 88 × H 78 cm', Assembly: 'Legs screw on, no tools', Warranty: '10 years on the frame' }),

  p(3, 'Mustard Lounge Chair', 'living-room', 520, 640, 9, IMG.armchairMustard,
    [IMG.chairYellowArt, IMG.livingPastel], 4.4, 61,
    'A compact wool-blend armchair with a matching footstool. Made for the corner of a room that needs one good place to read.',
    { Material: 'Wool blend, beech', Dimensions: 'W 72 × D 76 × H 82 cm', Includes: 'Matching footstool', Warranty: '5 years on the frame' }),

  p(4, 'Boucle Corner Sectional', 'living-room', 1980, 2340, 3, IMG.sectionalGrey,
    [IMG.livingNeutral, IMG.livingBright], 4.7, 42,
    'A left-hand corner sectional in ivory boucle with loose back cushions, so it slouches properly instead of staying formal. The covers come off for cleaning.',
    { Material: 'Boucle, hardwood frame', Dimensions: 'W 285 × D 190 × H 82 cm', Assembly: 'Two sections clip together', Warranty: '10 years on the frame' }),

  p(5, 'Ochre Two-Seater Sofa', 'living-room', 890, 890, 0, IMG.sofaYellow,
    [IMG.livingWarm, IMG.livingPastel], 4.3, 28,
    'A compact ochre two-seater with a tight back and turned wooden legs. Small enough for a flat, substantial enough not to look like a spare.',
    { Material: 'Brushed cotton, ash legs', Dimensions: 'W 164 × D 84 × H 80 cm', Assembly: 'Legs screw on', Warranty: '5 years on the frame' }),

  p(6, 'Travertine Coffee Table', 'living-room', 890, 970, 5, IMG.clockWall,
    [IMG.livingRounded, IMG.livingNeutral], 4.5, 37,
    'A solid travertine slab on a chamfered plinth base, filled and honed to a low sheen. Heavy on purpose — it is the piece the rest of the room arranges itself around.',
    { Material: 'Honed travertine', Dimensions: 'W 120 × D 60 × H 34 cm', Assembly: 'Two-person lift, no assembly', Warranty: '2 years' }),

  p(7, 'Handwoven Wool Rug', 'living-room', 520, 570, 6, IMG.rugRolled,
    [IMG.livingBright, IMG.livingWarm], 4.6, 93,
    'Flat-weave undyed wool from a family mill. Reversible, and the natural lanolin makes it shrug off most spills if you get to them quickly.',
    { Material: '100% undyed wool', Dimensions: '160 × 230 cm', Care: 'Vacuum without a beater bar', Warranty: '2 years' }),

  // ---- Bedroom ----
  p(8, 'Walnut Bedside Table', 'bedroom', 295, 320, 8, IMG.consoleWalnut,
    [IMG.bedroomNightstand, IMG.bedroomOttoman], 4.7, 118,
    'Solid American walnut with a single soft-close drawer and a cable notch at the back. Finished in hardwax oil you can repair with a cloth rather than a workshop.',
    { Material: 'Solid American walnut', Dimensions: 'W 45 × D 40 × H 55 cm', Assembly: 'Legs attach with four bolts', Warranty: '5 years' }),

  p(9, 'Washed Linen Bedding Set', 'bedroom', 260, 290, 40, IMG.pillowWhite,
    [IMG.bedBench, IMG.bedroomNightstand], 4.8, 214,
    'Stonewashed European flax in a warm clay tone. Gets softer with every wash and never needs ironing to look like it belongs on a made bed.',
    { Material: 'European flax linen', Includes: 'Duvet cover and two pillowcases', Sizes: 'Double, King, Super King', Care: 'Machine wash cold' }),

  p(10, 'Upholstered Bed Frame', 'bedroom', 1240, 1240, 4, IMG.bedBench,
    [IMG.bedroomOttoman, IMG.bedroomNightstand], 4.5, 66,
    'A low headboard in sand-coloured wool with a slatted base that needs no box spring. The bench at the foot is sold separately, but it does belong there.',
    { Material: 'Wool blend, pine frame', Dimensions: 'King, W 165 × L 215 × H 110 cm', Assembly: '45 minutes, two people', Warranty: '5 years' }),

  p(11, 'Rattan Storage Basket', 'bedroom', 110, 125, 18, IMG.storageMudroom,
    [IMG.bedroomOttoman, IMG.livingNeutral], 4.2, 47,
    'Hand-coiled rattan with a cotton rope rim, deep enough to swallow a full basket of throws. Holds its shape empty, which most soft baskets do not.',
    { Material: 'Rattan, cotton rope', Dimensions: 'Ø 45 × H 40 cm', Care: 'Wipe with a damp cloth', Warranty: '1 year' }),

  p(12, 'Oak Bedroom Bench', 'bedroom', 380, 440, 7, IMG.bedroomOttoman,
    [IMG.bedBench, IMG.bedroomNightstand], 4.4, 31,
    'A slatted white oak bench for the end of a bed, or a hallway if the bed is already crowded. Takes a cushion well and holds its own without one.',
    { Material: 'Solid white oak', Dimensions: 'W 120 × D 40 × H 45 cm', Assembly: 'Legs attach with eight bolts', Warranty: '5 years' }),

  // ---- Kitchen & Dining ----
  p(13, 'Round Oak Dining Table', 'kitchen-dining', 940, 1090, 6, IMG.tableRound,
    [IMG.diningWindow, IMG.diningDark], 4.7, 88,
    'A 120cm round top on a single turned pedestal, so nobody ends up straddling a leg. Seats four comfortably and five when it has to.',
    { Material: 'Solid white oak', Dimensions: 'Ø 120 × H 75 cm', Assembly: 'Pedestal bolts to the top', Warranty: '10 years' }),

  p(14, 'Moulded Dining Chair', 'kitchen-dining', 145, 175, 34, IMG.chairMoulded,
    [IMG.diningWindow, IMG.diningDark], 4.3, 152,
    'A moulded seat in matte black on solid beech legs, with a little flex across the back. Stacks three high when the table needs to be a desk.',
    { Material: 'Polypropylene, beech', Dimensions: 'W 49 × D 52 × H 82 cm', Assembly: 'Four screws per chair', Warranty: '3 years' }),

  p(15, 'Stoneware Dinner Set', 'kitchen-dining', 220, 260, 22, IMG.slateSurface,
    [IMG.platterRoast, IMG.kitchenGreens], 4.6, 176,
    'Sixteen pieces of reactive-glazed stoneware in a speckled clay body. Dishwasher and oven safe to 260°C, and no two pieces glaze quite the same.',
    { Material: 'Reactive-glazed stoneware', Includes: '4 × dinner, side, bowl, mug', Care: 'Dishwasher and oven safe', Warranty: '2 years against chipping' }),

  p(16, 'Oak Cutting Board', 'kitchen-dining', 95, 95, 35, IMG.platterRoast,
    [IMG.kitchenGreens, IMG.slateSurface], 4.5, 121,
    'End-grain white oak, 45cm across, with routed side handles and a juice groove. End grain closes around the knife edge, so it dulls blades far less than bamboo.',
    { Material: 'End-grain white oak', Dimensions: 'W 45 × D 35 × H 4 cm', Care: 'Hand wash, oil monthly', Warranty: '1 year' }),

  p(17, 'Smoked Glass Carafe', 'kitchen-dining', 78, 78, 28, IMG.glassware,
    [IMG.kitchenGreens, IMG.diningWindow], 4.4, 64,
    'Mouth-blown smoked glass with a tumbler that seats as a lid. Meant for a bedside table, though it does equally well holding wine at dinner.',
    { Material: 'Mouth-blown glass', Capacity: '1 litre', Care: 'Hand wash', Warranty: '1 year' }),

  p(18, 'Counter Stool', 'kitchen-dining', 190, 230, 16, IMG.stoolWhite,
    [IMG.kitchenGreens, IMG.diningWindow], 4.2, 58,
    'A pared-back stool in lacquered ash at counter height, with a footrail set where a foot actually wants it.',
    { Material: 'Lacquered ash', Dimensions: 'W 40 × D 40 × H 65 cm', Assembly: 'Four bolts', Warranty: '3 years' }),

  p(19, 'Bistro Table Set', 'kitchen-dining', 460, 540, 5, IMG.bistroSet,
    [IMG.diningWindow, IMG.livingBright], 4.1, 24,
    'A powder-coated steel bistro table with two chairs, sized for a balcony or the corner of a kitchen. Rated for outdoor use, sensible enough for indoors.',
    { Material: 'Powder-coated steel', Dimensions: 'Ø 60 × H 74 cm', Includes: 'Table and two chairs', Warranty: '2 years against rust' }),

  // ---- Lighting ----
  p(20, 'Ceramic Pendant Light', 'lighting', 185, 185, 30, IMG.pendantWhite,
    [IMG.pendantCounter, IMG.livingPendants], 4.6, 97,
    'Hand-thrown stoneware shade with a matte glaze and a woven cloth cord. Casts a warm downward pool of light over a dining table or kitchen island.',
    { Material: 'Hand-thrown stoneware', Dimensions: 'Ø 30 × H 24 cm', Fitting: 'E27, bulb not included', Warranty: '2 years' }),

  p(21, 'Brass Cluster Pendant', 'lighting', 420, 480, 11, IMG.pendantBrass,
    [IMG.livingPendants, IMG.pendantCounter], 4.7, 53,
    'Three unlacquered brass domes on independently adjustable drops, so you can stagger them over a long table. The brass will patina to a soft brown.',
    { Material: 'Unlacquered brass', Dimensions: 'Drops adjustable to 150 cm', Fitting: '3 × E14, bulbs not included', Warranty: '2 years' }),

  p(22, 'Tripod Table Lamp', 'lighting', 340, 340, 15, IMG.lampTripod,
    [IMG.bedroomNightstand, IMG.livingWarm], 4.5, 72,
    'A turned-wood tripod base under a warm ivory drum shade. Dimmable in-line switch on the cord, and light enough to move between the desk and the bedside.',
    { Material: 'Ash, cotton shade', Dimensions: 'Ø 35 × H 62 cm', Fitting: 'E27, dimmable', Warranty: '2 years' }),

  p(23, 'Adjustable Task Lamp', 'lighting', 165, 195, 26, IMG.lampTask,
    [IMG.deskWhite, IMG.floorLampRoom], 4.4, 110,
    'A counterweighted desk lamp in matte charcoal with a spun aluminium shade. Holds any position you leave it in, which is most of what a task lamp has to do.',
    { Material: 'Spun aluminium, steel', Dimensions: 'Reach 60 cm', Fitting: 'E27, bulb not included', Warranty: '3 years' }),

  p(24, 'Arc Floor Lamp', 'lighting', 495, 560, 8, IMG.floorLampRoom,
    [IMG.livingWarm, IMG.livingNeutral], 4.3, 39,
    'A long steel arc on a weighted marble base, made to reach over a sofa where there is no room for a side table.',
    { Material: 'Steel, marble base', Dimensions: 'Reach 180 × H 210 cm', Fitting: 'E27, dimmable', Warranty: '3 years' }),

  // ---- Decor ----
  p(25, 'Minimal Wall Clock', 'decor', 120, 140, 24, IMG.clockWall,
    [IMG.livingNeutral, IMG.livingBright], 4.2, 68,
    'A 30cm dial with no numerals and a silent sweep movement, so it does not tick through a quiet room.',
    { Material: 'Powder-coated steel', Dimensions: 'Ø 30 cm', Power: 'One AA battery, included', Warranty: '2 years' }),

  p(26, 'Dried Grass Arrangement', 'decor', 68, 68, 45, IMG.vaseGrass,
    [IMG.livingPastel, IMG.livingRounded], 4.1, 82,
    'Bleached pampas and wheat in a tall stoneware vessel. It needs nothing from you, which is the point.',
    { Material: 'Dried grasses, stoneware vase', Dimensions: 'H 90 cm arranged', Care: 'Keep out of direct sun', Warranty: '—' }),

  p(27, 'Ceramic Planter', 'decor', 85, 98, 33, IMG.planterSnake,
    [IMG.livingRounded, IMG.livingPastel], 4.5, 91,
    'A matte white planter with a hidden drainage reservoir, so nothing pools on the floor. Fits a 24cm nursery pot without repotting.',
    { Material: 'Glazed ceramic', Dimensions: 'Ø 28 × H 30 cm', Includes: 'Drainage reservoir', Warranty: '1 year' }),

  p(28, 'Framed Gallery Print', 'decor', 145, 175, 20, IMG.chairYellowArt,
    [IMG.livingNeutral, IMG.livingBright], 4.0, 44,
    'A giclée print on cotton rag in a solid oak frame with museum glass. Comes ready to hang, with the hardware sized for plaster or brick.',
    { Material: 'Cotton rag, oak frame', Dimensions: '50 × 70 cm framed', Includes: 'Hanging hardware', Warranty: '1 year' }),

  // ---- Storage ----
  p(29, 'Oak Shelving Unit', 'storage', 720, 850, 6, IMG.shelvingOak,
    [IMG.livingNeutral, IMG.storageMudroom], 4.6, 57,
    'Five open bays in solid oak with a shallow back rail, so books lean without falling through. Anchors to the wall with the supplied bracket.',
    { Material: 'Solid oak', Dimensions: 'W 90 × D 35 × H 180 cm', Assembly: 'One hour, two people', Warranty: '5 years' }),

  p(30, 'Entryway Storage Bench', 'storage', 540, 620, 9, IMG.storageMudroom,
    [IMG.shelvingOak, IMG.livingBright], 4.3, 35,
    'A hall bench with three open cubbies below and hooks above, in painted poplar with an oak seat. Built for the pile that accumulates by a front door.',
    { Material: 'Painted poplar, oak seat', Dimensions: 'W 120 × D 40 × H 180 cm', Assembly: '90 minutes, two people', Warranty: '5 years' }),
];

export const PROMO_CODES = [
  { code: 'SPACEJOY10', type: 'percent', value: 10, description: '10% off your order' },
  { code: 'WELCOME25', type: 'fixed', value: 25, minimum: 150, description: '$25 off orders over $150' },
  { code: 'FREESHIP', type: 'shipping', value: 0, description: 'Free standard shipping' },
];

export const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard', estimate: '4–6 business days', price: 12 },
  { id: 'express', name: 'Express', estimate: '2 business days', price: 28 },
  { id: 'white-glove', name: 'White glove delivery', estimate: '7–10 business days, room of choice', price: 85 },
];

export const FREE_SHIPPING_THRESHOLD = 500;
