// Seed data for demo mode. Shapes mirror the SQL Server recordsets the real
// backend returns, so components need no branching between demo and live data.

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=70`;

export const PRODUCTS = [
  {
    Product_id: 1,
    Product_name: 'Linen Accent Armchair',
    Product_description:
      'A low-slung lounge chair in oatmeal linen over a solid oak frame. The cushions are feather-wrapped foam, so it keeps its shape through years of Sunday afternoons.',
    Product_price: 640,
    Product_image: img('1567538096630-e0c55bd6374c'),
    Quantity: 12,
    Discount: 60,
    Category: 'Living Room',
    IsAvailable: true,
    isDeleted: false,
  },
  {
    Product_id: 2,
    Product_name: 'Ceramic Pendant Light',
    Product_description:
      'Hand-thrown stoneware shade with a matte glaze and a woven cloth cord. Casts a warm downward pool of light over a dining table or kitchen island.',
    Product_price: 185,
    Product_image: img('1507473885765-e6ed057f782c'),
    Quantity: 30,
    Discount: 0,
    Category: 'Lighting',
    IsAvailable: true,
    isDeleted: false,
  },
  {
    Product_id: 3,
    Product_name: 'Walnut Bedside Table',
    Product_description:
      'Solid American walnut with a single soft-close drawer and a cable notch at the back. Finished in hardwax oil that you can repair with a cloth rather than a workshop.',
    Product_price: 295,
    Product_image: img('1532372320572-cda25653a26d'),
    Quantity: 8,
    Discount: 25,
    Category: 'Bedroom',
    IsAvailable: true,
    isDeleted: false,
  },
  {
    Product_id: 4,
    Product_name: 'Stoneware Dinner Set',
    Product_description:
      'Sixteen pieces of reactive-glazed stoneware in a speckled clay body. Dishwasher and oven safe to 260°C, and no two pieces glaze quite the same.',
    Product_price: 220,
    Product_image: img('1578662996442-48f60103fc96'),
    Quantity: 22,
    Discount: 20,
    Category: 'Kitchen and Dining',
    IsAvailable: true,
    isDeleted: false,
  },
  {
    Product_id: 5,
    Product_name: 'Boucle Lounge Sofa',
    Product_description:
      'A three-seater in ivory boucle with rounded arms and a kiln-dried hardwood frame. Loose back cushions, so it slouches properly instead of staying formal.',
    Product_price: 1450,
    Product_image: img('1493663284031-b7e3aefcae8e'),
    Quantity: 4,
    Discount: 150,
    Category: 'Living Room',
    IsAvailable: true,
    isDeleted: false,
  },
  {
    Product_id: 6,
    Product_name: 'Tripod Table Lamp',
    Product_description:
      'A turned-wood tripod base under a warm ivory drum shade. Dimmable in-line switch on the cord, and light enough to move between the desk and the bedside.',
    Product_price: 340,
    Product_image: img('1517991104123-1d56a6e81ed9'),
    Quantity: 15,
    Discount: 0,
    Category: 'Lighting',
    IsAvailable: true,
    isDeleted: false,
  },
  {
    Product_id: 7,
    Product_name: 'Washed Linen Bedding',
    Product_description:
      'Stonewashed European flax in a warm clay tone. Gets softer with every wash and does not need ironing to look like it belongs on a made bed.',
    Product_price: 260,
    Product_image: img('1522771739844-6a9f6d5f14af'),
    Quantity: 40,
    Discount: 30,
    Category: 'Bedroom',
    IsAvailable: true,
    isDeleted: false,
  },
  {
    Product_id: 8,
    Product_name: 'Oak Cutting Board',
    Product_description:
      'End-grain white oak, 45cm across, with routed side handles and a juice groove. End grain closes around the knife edge, so it dulls blades far less than bamboo.',
    Product_price: 95,
    Product_image: img('1594221708779-94832f4320d1'),
    Quantity: 35,
    Discount: 0,
    Category: 'Kitchen and Dining',
    IsAvailable: true,
    isDeleted: false,
  },
  {
    Product_id: 9,
    Product_name: 'Handwoven Wool Rug',
    Product_description:
      'Flat-weave undyed wool from a family mill, 160 x 230cm. Reversible, and the natural lanolin makes it shrug off most spills if you get to them quickly.',
    Product_price: 520,
    Product_image: img('1600166898405-da9535204843'),
    Quantity: 6,
    Discount: 50,
    Category: 'Living Room',
    IsAvailable: true,
    isDeleted: false,
  },
  {
    Product_id: 10,
    Product_name: 'Smoked Glass Carafe',
    Product_description:
      'Mouth-blown smoked glass with a tumbler that seats as a lid. Meant for a bedside table, though it does equally well holding wine at dinner.',
    Product_price: 78,
    Product_image: img('1544145945-f90425340c7e'),
    Quantity: 28,
    Discount: 0,
    Category: 'Kitchen and Dining',
    IsAvailable: true,
    isDeleted: false,
  },
  {
    Product_id: 11,
    Product_name: 'Rattan Storage Basket',
    Product_description:
      'Hand-coiled rattan with a cotton rope rim, deep enough to swallow a full basket of throws. Holds its shape empty, which most soft baskets do not.',
    Product_price: 110,
    Product_image: img('1584100936595-c0654b55a2e2'),
    Quantity: 18,
    Discount: 10,
    Category: 'Bedroom',
    IsAvailable: true,
    isDeleted: false,
  },
  {
    Product_id: 12,
    Product_name: 'Travertine Coffee Table',
    Product_description:
      'A solid travertine slab on a chamfered plinth base, filled and honed to a low sheen. Heavy on purpose — it is the piece the rest of the room arranges itself around.',
    Product_price: 890,
    Product_image: img('1533090161767-e6ffed986c88'),
    Quantity: 5,
    Discount: 80,
    Category: 'Living Room',
    IsAvailable: true,
    isDeleted: false,
  },
];

export const USERS = [
  {
    User_Id: 1,
    Name: 'Abigail Theuri',
    userName: 'abby422',
    Email: 'admin@spacejoy.demo',
    User_role: 'Admin',
    IsDeleted: false,
    password: 'demo1234',
  },
  {
    User_Id: 2,
    Name: 'Jordan Mwangi',
    userName: 'jordanm',
    Email: 'jordan@example.com',
    User_role: 'User',
    IsDeleted: false,
    password: 'demo1234',
  },
  {
    User_Id: 3,
    Name: 'Priya Raman',
    userName: 'priyar',
    Email: 'priya@example.com',
    User_role: 'User',
    IsDeleted: false,
    password: 'demo1234',
  },
  {
    User_Id: 4,
    Name: 'Sam Otieno',
    userName: 'samo',
    Email: 'sam@example.com',
    User_role: 'User',
    IsDeleted: false,
    password: 'demo1234',
  },
];

export const DEMO_ADMIN = {
  email: 'admin@spacejoy.demo',
  password: 'demo1234',
};
