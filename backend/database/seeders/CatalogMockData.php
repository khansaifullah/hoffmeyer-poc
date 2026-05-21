<?php

namespace Database\Seeders;

class CatalogMockData
{
    public const HOME_FEATURED_PRODUCT_SLUGS = [
        'heavy-duty-rubber-conveyor-belt',
        'dodge-pillow-block-bearing',
        'wd40-specialist-silicone-lubricant',
        'huskey-lube-o-seal-ptfe-grease',
        'neoprene-sheet-rubber-gasket',
        'fuel-oil-suction-hose',
    ];

    public const FEATURED_BRAND_NAMES = [
        'SKF', 'DODGE', 'TIMKEN', 'NSK', 'Parker', 'Continental', 'CARLISLE', 'Martin',
    ];

    public static function categories(): array
    {
        return [
            ['name' => 'Conveyor Belts', 'image' => '/images/products/conveyor-belt.png'],
            ['name' => 'Industrial Hose', 'image' => '/images/products/industrial-hose.png'],
            ['name' => 'Hydraulic Hose', 'image' => '/images/products/hydraulic-hose-v2.png'],
            ['name' => "Hose Fittings &\nAdapters", 'image' => '/images/products/hose-fittings.png'],
            ['name' => 'Rubber & Gaskets', 'image' => '/images/products/oil-seal.png'],
            ['name' => "Conveyor\nComponents", 'image' => '/images/products/conveyor-components.png'],
            ['name' => 'Bearings', 'image' => '/images/products/bearing.png'],
            ['name' => 'Motors & Control', 'image' => '/images/products/motors-control.png'],
            ['name' => "Pipe Valves &\nFittings", 'image' => '/images/products/pipe-valves.png'],
            ['name' => "Adhesives &\nLubricants", 'image' => '/images/products/wd40.png'],
            ['name' => 'Packing & Sealing', 'image' => '/images/products/packing-sealing-v2.png'],
            ['name' => "Safety Gear &\nSupplies", 'image' => '/images/products/safety-gear-v2.png'],
        ];
    }

    public static function subcategoryMap(): array
    {
        return [
            'bearings' => [
                ['name' => 'Ball Bearings', 'image' => '/images/products/bearing.png'],
                ['name' => 'Cam Followers and Yoke Rollers', 'image' => '/images/products/bearing.png'],
                ['name' => 'Insert Bearings and Cartridge Units', 'image' => '/images/products/bearing.png'],
                ['name' => 'Mounted Bearings', 'image' => '/images/products/bearing.png'],
                ['name' => 'Plain Bearings', 'image' => '/images/products/bearing.png'],
                ['name' => 'Rod Ends and Spherical Plain Bearings', 'image' => '/images/products/bearing.png'],
                ['name' => 'Roller Bearings', 'image' => '/images/products/bearing.png'],
                ['name' => 'Slewing Rings and Turntables', 'image' => '/images/products/bearing.png'],
                ['name' => 'Thrust Bearings', 'image' => '/images/products/bearing.png'],
                ['name' => 'Accessories', 'image' => '/images/products/bearing.png'],
            ],
            'conveyor-belts' => [
                ['name' => 'Heavy-Duty Rubber Belts', 'image' => '/images/products/conveyor-belt.png'],
                ['name' => 'Cleated & Incline Belts', 'image' => '/images/products/conveyor-belt.png'],
                ['name' => 'Heat Resistant Belts', 'image' => '/images/products/conveyor-belt.png'],
                ['name' => 'Oil Resistant Belts', 'image' => '/images/products/conveyor-belt.png'],
                ['name' => 'Food-Grade Belts', 'image' => '/images/products/conveyor-belt.png'],
                ['name' => 'Replacement Belting', 'image' => '/images/products/conveyor-belt.png'],
            ],
            'industrial-hose' => [
                ['name' => 'Water & Air Hose', 'image' => '/images/products/industrial-hose.png'],
                ['name' => 'Chemical Transfer Hose', 'image' => '/images/products/industrial-hose.png'],
                ['name' => 'Steam & High-Temp Hose', 'image' => '/images/products/industrial-hose.png'],
                ['name' => 'Fuel & Oil Hose', 'image' => '/images/products/fuel-hose.png'],
                ['name' => 'Material Handling Hose', 'image' => '/images/products/industrial-hose.png'],
                ['name' => 'Hose Accessories', 'image' => '/images/products/industrial-hose.png'],
            ],
            'hydraulic-hose' => [
                ['name' => 'Braided Hydraulic Hose', 'image' => '/images/products/hydraulic-hose-v2.png'],
                ['name' => 'Spiral Wire Hose', 'image' => '/images/products/hydraulic-hose-v2.png'],
                ['name' => 'Return Line Hose', 'image' => '/images/products/hydraulic-hose-v2.png'],
                ['name' => 'Thermoplastic Hose', 'image' => '/images/products/hydraulic-hose-v2.png'],
                ['name' => 'High-Temp Hydraulic Hose', 'image' => '/images/products/hydraulic-hose-v2.png'],
                ['name' => 'Hydraulic Hose Kits', 'image' => '/images/products/hydraulic-hose-v2.png'],
            ],
        ];
    }

    public static function genericSubcategories(string $categoryName, string $image): array
    {
        $label = str_replace("\n", ' ', $categoryName);

        return [
            ['name' => "Standard {$label}", 'image' => $image],
            ['name' => "Heavy-Duty {$label}", 'image' => $image],
            ['name' => "Industrial {$label}", 'image' => $image],
            ['name' => "Replacement {$label}", 'image' => $image],
            ['name' => "{$label} Accessories", 'image' => $image],
            ['name' => "{$label} Kits", 'image' => $image],
        ];
    }

    public static function brands(): array
    {
        return [
            ['name' => 'SKF', 'logo' => '/images/brands/skf.svg'],
            ['name' => 'DODGE', 'logo' => '/images/brands/dodge.svg'],
            ['name' => 'TIMKEN', 'logo' => '/images/brands/timken.svg'],
            ['name' => 'NSK', 'logo' => '/images/brands/nsk.svg'],
            ['name' => 'SEALMASTER', 'logo' => '/images/brands/sealmaster.svg'],
            ['name' => 'SCHAEFFLER', 'logo' => '/images/brands/schaeffler.svg'],
            ['name' => 'NTN', 'logo' => '/images/brands/ntn.svg'],
            ['name' => 'Link-Belt', 'logo' => '/images/brands/link-belt.svg'],
            ['name' => 'Continental', 'logo' => '/images/brands/continental.svg'],
            ['name' => 'Parker', 'logo' => '/images/brands/parker.svg'],
            ['name' => 'CARLISLE', 'logo' => '/images/brands/carlisle.svg'],
            ['name' => 'Martin', 'logo' => '/images/brands/martin.svg'],
            ['name' => 'FALK', 'logo' => '/images/brands/falk.svg'],
            ['name' => 'REXNORD', 'logo' => '/images/brands/rexnord.svg'],
            ['name' => 'TSUBAKI', 'logo' => '/images/brands/tsubaki.svg'],
        ];
    }

    public static function brandDescriptions(): array
    {
        return [
            'dodge' => 'For more than 140 years, Dodge has supplied the industrial market with trusted bearing, gearing, and power transmission solutions built for demanding applications.',
            'skf' => 'SKF is a global supplier of bearings, seals, lubrication systems, and services for industrial and automotive markets.',
            'timken' => 'Timken engineers and manufactures bearings and power transmission components for some of the world\'s most demanding operations.',
        ];
    }

    public static function categoryProducts(): array
    {
        return [
            'conveyor-belts' => [
                ['name' => 'Heavy-Duty Rubber Conveyor Belt', 'price' => 120.00, 'image' => '/images/products/conveyor-belt.png'],
                ['name' => 'Cleated Incline Conveyor Belt', 'price' => 150.00, 'image' => '/images/products/conveyor-belt.png'],
                ['name' => 'Heat Resistant Belt', 'price' => 180.00, 'image' => '/images/products/conveyor-belt.png'],
                ['name' => 'Oil Resistant Belt', 'price' => 140.00, 'image' => '/images/products/conveyor-belt.png'],
                ['name' => 'Chevron Multi-V Conveyor Belt', 'price' => 160.00, 'image' => '/images/products/conveyor-belt.png'],
                ['name' => 'FDA Food-Grade Conveyor Belt', 'price' => 110.00, 'image' => '/images/products/conveyor-belt.png'],
            ],
            'industrial-hose' => [
                ['name' => 'General Purpose Water Hose', 'price' => 45.00, 'image' => '/images/products/industrial-hose.png'],
                ['name' => 'Premium Chemical Transfer Hose', 'price' => 290.00, 'image' => '/images/products/industrial-hose.png'],
                ['name' => 'Heavy-Duty Air & Multipurpose Hose', 'price' => 85.00, 'image' => '/images/products/industrial-hose.png'],
                ['name' => 'High-Temp Steam Hose', 'price' => 140.00, 'image' => '/images/products/industrial-hose.png'],
                ['name' => 'Fuel & Oil Suction Hose', 'price' => 195.00, 'image' => '/images/products/fuel-hose.png'],
                ['name' => 'Corrugated Metal Hose', 'price' => 320.00, 'image' => '/images/products/industrial-hose.png'],
            ],
            'hydraulic-hose' => [
                ['name' => 'High-Pressure Braided Hydraulic Hose', 'price' => 98.00, 'image' => '/images/products/hydraulic-hose-v2.png'],
                ['name' => 'Spiral Wire Reinforced Hydraulic Hose', 'price' => 165.00, 'image' => '/images/products/hydraulic-hose-v2.png'],
                ['name' => 'Medium Pressure Textile Braided Hose', 'price' => 60.00, 'image' => '/images/products/hydraulic-hose-v2.png'],
                ['name' => 'Low-Pressure Return Line Hose', 'price' => 40.00, 'image' => '/images/products/hydraulic-hose-v2.png'],
                ['name' => 'Thermoplastic Hydraulic Hose', 'price' => 115.00, 'image' => '/images/products/hydraulic-hose-v2.png'],
                ['name' => 'High-Temp 2-Wire Hydraulic Hose', 'price' => 145.00, 'image' => '/images/products/hydraulic-hose-v2.png'],
            ],
            'hose-fittings-and-adapters' => [
                ['name' => 'JIC 37-Degree Flare Adapter', 'price' => 12.50, 'image' => '/images/products/hose-fittings.png'],
                ['name' => 'NPTF Pipe Swivel Elbow', 'price' => 18.20, 'image' => '/images/products/hose-fittings.png'],
                ['name' => 'SAE O-Ring Boss Fitting', 'price' => 14.90, 'image' => '/images/products/hose-fittings.png'],
                ['name' => 'Quick Disconnect Hose Coupler', 'price' => 45.00, 'image' => '/images/products/hose-fittings.png'],
                ['name' => 'Split Flange Hydraulic Fitting', 'price' => 28.00, 'image' => '/images/products/hose-fittings.png'],
                ['name' => 'Brass Hose Barb Insert', 'price' => 8.50, 'image' => '/images/products/hose-fittings.png'],
            ],
            'rubber-and-gaskets' => [
                ['name' => 'Neoprene Sheet Rubber Gasket', 'price' => 32.00, 'image' => '/images/products/oil-seal.png'],
                ['name' => 'Red Rubber Flange Gasket', 'price' => 14.50, 'image' => '/images/products/oil-seal.png'],
                ['name' => 'EPDM High-Temp Gasket Sheet', 'price' => 48.00, 'image' => '/images/products/oil-seal.png'],
                ['name' => 'Buna-N Nitrile O-Ring Assortment', 'price' => 22.00, 'image' => '/images/products/oil-seal.png'],
                ['name' => 'Spiral Wound Metal Gasket', 'price' => 85.00, 'image' => '/images/products/oil-seal.png'],
                ['name' => 'Silicone Sponge Rubber Strip', 'price' => 18.90, 'image' => '/images/products/oil-seal.png'],
            ],
            'conveyor-components' => [
                ['name' => 'CEMA C Steel Conveyor Idler Rollers', 'price' => 110.00, 'image' => '/images/products/conveyor-components.png'],
                ['name' => 'Self-Cleaning Wing Pulley', 'price' => 420.00, 'image' => '/images/products/conveyor-components.png'],
                ['name' => 'Conveyor Belt Scraper Blades', 'price' => 180.00, 'image' => '/images/products/conveyor-components.png'],
                ['name' => 'Lagged Drum Pulley', 'price' => 350.00, 'image' => '/images/products/conveyor-components.png'],
                ['name' => 'Impact Bed Slider Bar', 'price' => 75.00, 'image' => '/images/products/conveyor-components.png'],
                ['name' => 'Pneumatic Belt Tensioning Cylinder', 'price' => 240.00, 'image' => '/images/products/conveyor-components.png'],
            ],
            'bearings' => [
                ['name' => 'Dodge® Pillow Block Bearing', 'price' => 79.00, 'image' => '/images/products/bearing.png', 'brand' => 'Dodge'],
                ['name' => 'Flange Mount 4-Bolt Ball Bearing', 'price' => 65.00, 'image' => '/images/products/bearing.png'],
                ['name' => 'Tapered Roller Bearing Assembly', 'price' => 120.00, 'image' => '/images/products/bearing.png', 'brand' => 'Timken'],
                ['name' => 'Split-Housing Spherical Roller Bearing', 'price' => 340.00, 'image' => '/images/products/bearing.png'],
                ['name' => 'Stainless Steel Take-Up Bearing', 'price' => 95.00, 'image' => '/images/products/bearing.png'],
                ['name' => 'Bronze Sleeve Bearing Bushing', 'price' => 12.00, 'image' => '/images/products/bearing.png'],
            ],
            'motors-and-control' => [
                ['name' => 'Three-Phase AC Induction Motor 5HP', 'price' => 380.00, 'image' => '/images/products/motors-control.png'],
                ['name' => 'Variable Frequency Drive (VFD) 230V', 'price' => 295.00, 'image' => '/images/products/motors-control.png'],
                ['name' => 'Right-Angle Gearmotor Reducer', 'price' => 460.00, 'image' => '/images/products/motors-control.png'],
                ['name' => 'Washdown Duty NEMA Motor 2HP', 'price' => 310.00, 'image' => '/images/products/motors-control.png'],
                ['name' => 'Magnetic Motor Starter Controller', 'price' => 115.00, 'image' => '/images/products/motors-control.png'],
                ['name' => 'Photoelectric Conveyor Sensor Switch', 'price' => 58.00, 'image' => '/images/products/motors-control.png'],
            ],
            'pipe-valves-and-fittings' => [
                ['name' => 'High-Pressure Brass Ball Valve 2"', 'price' => 85.00, 'image' => '/images/products/pipe-valves.png'],
                ['name' => 'Cast Iron Butterfly Valve Wafers', 'price' => 140.00, 'image' => '/images/products/pipe-valves.png'],
                ['name' => 'Forged Steel Gate Valve 600#', 'price' => 290.00, 'image' => '/images/products/pipe-valves.png'],
                ['name' => 'Stainless Steel Pipe Tee Fitting', 'price' => 34.00, 'image' => '/images/products/pipe-valves.png'],
                ['name' => 'Sch 80 PVC Pipe Coupling Connector', 'price' => 7.50, 'image' => '/images/products/pipe-valves.png'],
                ['name' => 'Carbon Steel Threaded Pipe Elbow', 'price' => 16.80, 'image' => '/images/products/pipe-valves.png'],
            ],
            'adhesives-and-lubricants' => [
                ['name' => 'WD40® Specialist Silicone Lubricant', 'price' => 14.90, 'image' => '/images/products/wd40.png'],
                ['name' => 'Huskey™ Lube-O-Seal PTFE Grease', 'price' => 24.50, 'image' => '/images/products/huskey.png'],
                ['name' => 'Loctite Threadlocker 242 Medium', 'price' => 18.50, 'image' => '/images/products/wd40.png'],
                ['name' => 'High-Strength Industrial RTV Silicone', 'price' => 12.00, 'image' => '/images/products/wd40.png'],
                ['name' => 'Heavy-Duty Anti-Seize Lubricant', 'price' => 22.00, 'image' => '/images/products/wd40.png'],
                ['name' => 'Cyanoacrylate Instant Adhesive Glue', 'price' => 9.50, 'image' => '/images/products/wd40.png'],
            ],
            'packing-and-sealing' => [
                ['name' => 'Automated Box Packing System', 'price' => 3400.00, 'image' => '/images/products/packing-sealing-v2.png'],
                ['name' => 'Industrial Box Taping Machine', 'price' => 1250.00, 'image' => '/images/products/packing-sealing-v2.png'],
                ['name' => 'PTFE Compression Valve Stem Packing', 'price' => 45.00, 'image' => '/images/products/packing-sealing-v2.png'],
                ['name' => 'Mechanical Pump Shaft Seal Assembly', 'price' => 180.00, 'image' => '/images/products/packing-sealing-v2.png'],
                ['name' => 'Heavy-Duty Cardboard Shipping Carton', 'price' => 4.20, 'image' => '/images/products/packing-sealing-v2.png'],
                ['name' => 'Graphite Pump Gland Packing Cord', 'price' => 60.00, 'image' => '/images/products/packing-sealing-v2.png'],
            ],
            'safety-gear-and-supplies' => [
                ['name' => 'Premium ABS Safety Hard Hat Yellow', 'price' => 24.00, 'image' => '/images/products/safety-gear-v2.png'],
                ['name' => 'Heavy-Duty Split-Cowhide Work Gloves', 'price' => 14.50, 'image' => '/images/products/safety-gear-v2.png'],
                ['name' => 'Professional Noise-Reduction Ear Muffs', 'price' => 29.00, 'image' => '/images/products/safety-gear-v2.png'],
                ['name' => 'High-Visibility Class 2 Safety Vest', 'price' => 12.90, 'image' => '/images/products/safety-gear-v2.png'],
                ['name' => 'Anti-Fog Scratch-Resistant Safety Glasses', 'price' => 8.50, 'image' => '/images/products/safety-gear-v2.png'],
                ['name' => 'Industrial First Aid Kit Wall-Cabinet', 'price' => 75.00, 'image' => '/images/products/safety-gear-v2.png'],
            ],
        ];
    }

    public static function slugify(string $name): string
    {
        $slug = strtolower(str_replace(["\n", '®', '™', '&'], [' ', '', '', 'and'], $name));
        $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);

        return trim($slug, '-');
    }

    public static function inferMaterial(string $name, string $description): string
    {
        $text = strtolower($name.' '.$description);

        if (str_contains($text, 'pvc')) {
            return 'PVC';
        }

        if (preg_match('/rubber|epdm|neoprene|buna|silicone|gasket|belt|hose/', $text) && ! str_contains($text, 'pvc')) {
            return 'Rubber';
        }

        return 'Synthetic';
    }

    public static function buildSpecs(string $material): array
    {
        $materialValues = [
            'Rubber' => 'Reinforced Synthetic Rubber',
            'PVC' => 'Industrial PVC Compound',
            'Synthetic' => 'High-Grade Synthetic Polymer',
        ];

        return [
            ['label' => 'Material', 'value' => $materialValues[$material] ?? 'Industrial Grade'],
            ['label' => 'Tensile Strength', 'value' => '3500 PSI'],
            ['label' => 'Max Temperature', 'value' => '250°F (121°C)'],
            ['label' => 'Industry Standards', 'value' => 'ISO 9001, ASTM-D'],
            ['label' => 'Country of Origin', 'value' => 'USA'],
            ['label' => 'Weight Per Foot', 'value' => '2.4 lbs'],
        ];
    }
}
