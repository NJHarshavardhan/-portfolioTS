-- Run this exactly as is in your Supabase SQL Editor

-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.gamewords (
    id SERIAL PRIMARY KEY,
    word TEXT NOT NULL UNIQUE
);

-- 2. Allow anonymous read access so the frontend can fetch the words
ALTER TABLE public.gamewords ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.gamewords
    FOR SELECT
    TO public
    USING (true);

-- 3. Insert the words
INSERT INTO public.gamewords (word) VALUES
('cat'), ('dog'), ('mouse'), ('elephant'), ('giraffe'), ('lion'), ('tiger'), ('bear'), ('zebra'), ('monkey'),
('kangaroo'), ('penguin'), ('snake'), ('crocodile'), ('turtle'), ('frog'), ('fish'), ('shark'), ('whale'), ('dolphin'),
('octopus'), ('crab'), ('jellyfish'), ('butterfly'), ('bee'), ('spider'), ('ant'), ('ladybug'), ('snail'), ('worm'),
('bird'), ('eagle'), ('owl'), ('parrot'), ('ostrich'), ('peacock'), ('flamingo'), ('swan'), ('duck'), ('chicken'),
('cow'), ('pig'), ('horse'), ('sheep'), ('goat'), ('donkey'), ('rabbit'), ('deer'), ('fox'), ('wolf'),
('tree'), ('flower'), ('grass'), ('leaf'), ('bush'), ('forest'), ('mountain'), ('hill'), ('valley'), ('river'),
('lake'), ('ocean'), ('sea'), ('beach'), ('sand'), ('rock'), ('stone'), ('dirt'), ('mud'), ('cloud'),
('sun'), ('moon'), ('star'), ('planet'), ('earth'), ('mars'), ('comet'), ('asteroid'), ('galaxy'), ('universe'),
('rain'), ('snow'), ('ice'), ('wind'), ('storm'), ('lightning'), ('thunder'), ('rainbow'), ('tornado'), ('volcano'),
('house'), ('door'), ('window'), ('roof'), ('chimney'), ('wall'), ('floor'), ('ceiling'), ('stairs'), ('ladder'),
('chair'), ('table'), ('bed'), ('sofa'), ('desk'), ('lamp'), ('clock'), ('mirror'), ('rug'), ('curtain'),
('cup'), ('glass'), ('plate'), ('bowl'), ('fork'), ('knife'), ('spoon'), ('chopsticks'), ('pan'), ('pot'),
('book'), ('notebook'), ('pen'), ('pencil'), ('eraser'), ('scissors'), ('glue'), ('ruler'), ('calculator'), ('backpack'),
('computer'), ('keyboard'), ('mouse_device'), ('monitor'), ('laptop'), ('tablet'), ('phone'), ('camera'), ('headphones'), ('microphone'),
('television'), ('radio'), ('speaker'), ('battery'), ('plug'), ('wire'), ('bulb'), ('flashlight'), ('candle'), ('match'),
('key'), ('lock'), ('tool'), ('hammer'), ('nail'), ('screw'), ('screwdriver'), ('wrench'), ('saw'), ('drill'),
('box'), ('bag'), ('basket'), ('bottle'), ('can'), ('jar'), ('bucket'), ('brush'), ('comb'), ('toothbrush'),
('soap'), ('shampoo'), ('towel'), ('sponge'), ('iron'), ('washing machine'), ('refrigerator'), ('oven'), ('microwave'), ('toaster'),
('car'), ('truck'), ('bus'), ('van'), ('motorcycle'), ('bicycle'), ('scooter'), ('skateboard'), ('rollerblades'), ('train'),
('subway'), ('tram'), ('airplane'), ('helicopter'), ('rocket'), ('spaceship'), ('boat'), ('ship'), ('submarine'), ('canoe'),
('tractor'), ('ambulance'), ('firetruck'), ('police car'), ('taxi'), ('carriage'), ('cart'), ('sled'), ('bulldozer'),
('head'), ('hair'), ('eye'), ('ear'), ('nose'), ('mouth'), ('lip'), ('tooth'), ('tongue'), ('face'),
('neck'), ('shoulder'), ('arm'), ('elbow'), ('wrist'), ('hand'), ('finger'), ('thumb'), ('chest'), ('back'),
('stomach'), ('leg'), ('knee'), ('ankle'), ('foot'), ('toe'), ('heel'), ('heart'), ('brain'), ('bone'),
('person'), ('man'), ('woman'), ('child'), ('baby'), ('boy'), ('girl'), ('king'), ('queen'), ('prince'),
('princess'), ('knight'), ('wizard'), ('witch'), ('ghost'), ('vampire'), ('zombie'), ('mummy'), ('alien'), ('monster'),
('shirt'), ('pants'), ('shorts'), ('dress'), ('skirt'), ('jacket'), ('coat'), ('sweater'), ('hoodie'), ('suit'),
('sock'), ('shoe'), ('boot'), ('slipper'), ('sandal'), ('hat'), ('cap'), ('helmet'), ('scarf'), ('glove'),
('belt'), ('tie'), ('glasses'), ('sunglasses'), ('watch'), ('ring'), ('necklace'), ('bracelet'), ('earring'), ('umbrella'),
('apple'), ('banana'), ('orange'), ('grape'), ('strawberry'), ('watermelon'), ('lemon'), ('peach'), ('cherry'), ('pineapple'),
('carrot'), ('potato'), ('tomato'), ('onion'), ('broccoli'), ('corn'), ('pea'), ('mushroom'), ('pepper'), ('garlic'),
('bread'), ('cheese'), ('egg'), ('meat'), ('fish_food'), ('bacon'), ('sausage'), ('hamburger'), ('hotdog'),
('pizza'), ('pasta'), ('soup'), ('salad'), ('sandwich'), ('taco'), ('burrito'), ('sushi'), ('rice'), ('noodle'),
('cake'), ('cookie'), ('pie'), ('ice cream'), ('chocolate'), ('candy'), ('donut'), ('cupcake'), ('pancake'), ('waffle'),
('water_drink'), ('milk'), ('juice'), ('coffee'), ('tea'), ('soda'), ('beer'), ('wine'), ('ice_cube'), ('honey'),
('music'), ('art'), ('science'), ('math'), ('history'), ('sports'), ('game'), ('toy'), ('doll'), ('ball'),
('bat'), ('racket'), ('net'), ('goal'), ('score'), ('team'), ('player'), ('coach'), ('referee'), ('fan'),
('fire'), ('earth_element'), ('air'), ('light'), ('dark'), ('color'), ('shape'), ('line'), ('dot')
ON CONFLICT DO NOTHING;
