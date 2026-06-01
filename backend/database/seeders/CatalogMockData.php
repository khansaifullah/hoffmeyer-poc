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

    /**
     * Mock products keyed by subcategory slug from CatalogTaxonomy.
     */
    public static function subcategoryProducts(): array
    {
        return [
            'conveyor-solutions-conveyor-belt-heavy-duty-belt-domestic-import' => [
                ['name' => 'Heavy-Duty Rubber Conveyor Belt', 'price' => 120.00, 'image' => '/images/products/conveyor-belt.png'],
                ['name' => 'Chevron Multi-V Conveyor Belt', 'price' => 160.00, 'image' => '/images/products/conveyor-belt.png'],
            ],
            'conveyor-solutions-conveyor-belt-incline-roughtop-belt' => [
                ['name' => 'Cleated Incline Conveyor Belt', 'price' => 150.00, 'image' => '/images/products/conveyor-belt.png'],
            ],
            'conveyor-solutions-conveyor-belt-food-belt' => [
                ['name' => 'FDA Food-Grade Conveyor Belt', 'price' => 110.00, 'image' => '/images/products/conveyor-belt.png'],
            ],
            'conveyor-solutions-conveyor-belt-misc-belting' => [
                ['name' => 'Heat Resistant Belt', 'price' => 180.00, 'image' => '/images/products/conveyor-belt.png'],
                ['name' => 'Oil Resistant Belt', 'price' => 140.00, 'image' => '/images/products/conveyor-belt.png'],
            ],
            'conveyor-solutions-conveyor-components-idlers' => [
                ['name' => 'CEMA C Steel Conveyor Idler Rollers', 'price' => 110.00, 'image' => '/images/products/conveyor-components.png'],
            ],
            'conveyor-solutions-conveyor-components-conveyor-pulleys' => [
                ['name' => 'Self-Cleaning Wing Pulley', 'price' => 420.00, 'image' => '/images/products/conveyor-components.png'],
                ['name' => 'Lagged Drum Pulley', 'price' => 350.00, 'image' => '/images/products/conveyor-components.png'],
            ],
            'conveyor-solutions-conveyor-components-misc-conveyor-components' => [
                ['name' => 'Conveyor Belt Scraper Blades', 'price' => 180.00, 'image' => '/images/products/conveyor-components.png'],
                ['name' => 'Impact Bed Slider Bar', 'price' => 75.00, 'image' => '/images/products/conveyor-components.png'],
                ['name' => 'Pneumatic Belt Tensioning Cylinder', 'price' => 240.00, 'image' => '/images/products/conveyor-components.png'],
            ],
            'hose-and-fittings-industrial-hose-air-multi-purpose-rubber-hose' => [
                ['name' => 'Heavy-Duty Air & Multipurpose Hose', 'price' => 85.00, 'image' => '/images/products/industrial-hose.png'],
            ],
            'hose-and-fittings-industrial-hose-chemical-paint-fluid-hose' => [
                ['name' => 'Premium Chemical Transfer Hose', 'price' => 290.00, 'image' => '/images/products/industrial-hose.png'],
            ],
            'hose-and-fittings-industrial-hose-steam-hose' => [
                ['name' => 'High-Temp Steam Hose', 'price' => 140.00, 'image' => '/images/products/industrial-hose.png'],
            ],
            'hose-and-fittings-industrial-hose-water-discharge-rubber-pvc' => [
                ['name' => 'General Purpose Water Hose', 'price' => 45.00, 'image' => '/images/products/industrial-hose.png'],
            ],
            'hose-and-fittings-industrial-hose-petroleum-hose' => [
                ['name' => 'Fuel & Oil Suction Hose', 'price' => 195.00, 'image' => '/images/products/fuel-hose.png'],
            ],
            'hose-and-fittings-industrial-hose-metal-hose' => [
                ['name' => 'Corrugated Metal Hose', 'price' => 320.00, 'image' => '/images/products/industrial-hose.png'],
            ],
            'hose-and-fittings-hydraulic-hose-aeroquip' => [
                ['name' => 'High-Pressure Braided Hydraulic Hose', 'price' => 98.00, 'image' => '/images/products/hydraulic-hose-v2.png'],
                ['name' => 'Spiral Wire Reinforced Hydraulic Hose', 'price' => 165.00, 'image' => '/images/products/hydraulic-hose-v2.png'],
            ],
            'hose-and-fittings-hydraulic-hose-misc-hydraulics' => [
                ['name' => 'Medium Pressure Textile Braided Hose', 'price' => 60.00, 'image' => '/images/products/hydraulic-hose-v2.png'],
                ['name' => 'Low-Pressure Return Line Hose', 'price' => 40.00, 'image' => '/images/products/hydraulic-hose-v2.png'],
                ['name' => 'Thermoplastic Hydraulic Hose', 'price' => 115.00, 'image' => '/images/products/hydraulic-hose-v2.png'],
                ['name' => 'High-Temp 2-Wire Hydraulic Hose', 'price' => 145.00, 'image' => '/images/products/hydraulic-hose-v2.png'],
            ],
            'hose-and-fittings-fittings-and-couplings-hydraulic-adapters' => [
                ['name' => 'JIC 37-Degree Flare Adapter', 'price' => 12.50, 'image' => '/images/products/hose-fittings.png'],
                ['name' => 'NPTF Pipe Swivel Elbow', 'price' => 18.20, 'image' => '/images/products/hose-fittings.png'],
                ['name' => 'SAE O-Ring Boss Fitting', 'price' => 14.90, 'image' => '/images/products/hose-fittings.png'],
                ['name' => 'Quick Disconnect Hose Coupler', 'price' => 45.00, 'image' => '/images/products/hose-fittings.png'],
                ['name' => 'Split Flange Hydraulic Fitting', 'price' => 28.00, 'image' => '/images/products/hose-fittings.png'],
                ['name' => 'Brass Hose Barb Insert', 'price' => 8.50, 'image' => '/images/products/hose-fittings.png'],
            ],
            'rubber-gaskets-and-seals-sheet-rubber-neoprene' => [
                ['name' => 'Neoprene Sheet Rubber Gasket', 'price' => 32.00, 'image' => '/images/products/oil-seal.png'],
            ],
            'rubber-gaskets-and-seals-sheet-rubber-red-rubber' => [
                ['name' => 'Red Rubber Flange Gasket', 'price' => 14.50, 'image' => '/images/products/oil-seal.png'],
            ],
            'rubber-gaskets-and-seals-sheet-rubber-epdm' => [
                ['name' => 'EPDM High-Temp Gasket Sheet', 'price' => 48.00, 'image' => '/images/products/oil-seal.png'],
            ],
            'rubber-gaskets-and-seals-packing-and-seals-o-ring-kits' => [
                ['name' => 'Buna-N Nitrile O-Ring Assortment', 'price' => 22.00, 'image' => '/images/products/oil-seal.png'],
            ],
            'rubber-gaskets-and-seals-gaskets-spiral-wound-gaskets' => [
                ['name' => 'Spiral Wound Metal Gasket', 'price' => 85.00, 'image' => '/images/products/oil-seal.png'],
            ],
            'rubber-gaskets-and-seals-sheet-rubber-silicone-sponge' => [
                ['name' => 'Silicone Sponge Rubber Strip', 'price' => 18.90, 'image' => '/images/products/oil-seal.png'],
            ],
            'bearings-bearings-all-types' => [
                ['name' => 'Dodge® Pillow Block Bearing', 'price' => 79.00, 'image' => '/images/products/bearing.png', 'brand' => 'Dodge'],
                ['name' => 'Flange Mount 4-Bolt Ball Bearing', 'price' => 65.00, 'image' => '/images/products/bearing.png'],
                ['name' => 'Tapered Roller Bearing Assembly', 'price' => 120.00, 'image' => '/images/products/bearing.png', 'brand' => 'Timken'],
                ['name' => 'Split-Housing Spherical Roller Bearing', 'price' => 340.00, 'image' => '/images/products/bearing.png'],
                ['name' => 'Stainless Steel Take-Up Bearing', 'price' => 95.00, 'image' => '/images/products/bearing.png'],
                ['name' => 'Bronze Sleeve Bearing Bushing', 'price' => 12.00, 'image' => '/images/products/bearing.png'],
            ],
            'electric-motors-electric-motors-electric-motors' => [
                ['name' => 'Three-Phase AC Induction Motor 5HP', 'price' => 380.00, 'image' => '/images/products/motors-control.png'],
                ['name' => 'Variable Frequency Drive (VFD) 230V', 'price' => 295.00, 'image' => '/images/products/motors-control.png'],
                ['name' => 'Washdown Duty NEMA Motor 2HP', 'price' => 310.00, 'image' => '/images/products/motors-control.png'],
                ['name' => 'Magnetic Motor Starter Controller', 'price' => 115.00, 'image' => '/images/products/motors-control.png'],
                ['name' => 'Photoelectric Conveyor Sensor Switch', 'price' => 58.00, 'image' => '/images/products/motors-control.png'],
            ],
            'power-transmission-gearboxes-and-reducers-gearmotors-and-reducers' => [
                ['name' => 'Right-Angle Gearmotor Reducer', 'price' => 460.00, 'image' => '/images/products/motors-control.png'],
            ],
            'pipe-valves-and-fittings-valves-misc-valves' => [
                ['name' => 'High-Pressure Brass Ball Valve 2"', 'price' => 85.00, 'image' => '/images/products/pipe-valves.png'],
                ['name' => 'Cast Iron Butterfly Valve Wafers', 'price' => 140.00, 'image' => '/images/products/pipe-valves.png'],
                ['name' => 'Forged Steel Gate Valve 600#', 'price' => 290.00, 'image' => '/images/products/pipe-valves.png'],
            ],
            'pipe-valves-and-fittings-pipe-and-tubing-pipe-fittings' => [
                ['name' => 'Stainless Steel Pipe Tee Fitting', 'price' => 34.00, 'image' => '/images/products/pipe-valves.png'],
                ['name' => 'Sch 80 PVC Pipe Coupling Connector', 'price' => 7.50, 'image' => '/images/products/pipe-valves.png'],
                ['name' => 'Carbon Steel Threaded Pipe Elbow', 'price' => 16.80, 'image' => '/images/products/pipe-valves.png'],
            ],
            'adhesives-lubricants-and-chemicals-lubricants-and-maintenance-greases-and-lubricants' => [
                ['name' => 'WD40® Specialist Silicone Lubricant', 'price' => 14.90, 'image' => '/images/products/wd40.png'],
                ['name' => 'Huskey™ Lube-O-Seal PTFE Grease', 'price' => 24.50, 'image' => '/images/products/huskey.png'],
            ],
            'adhesives-lubricants-and-chemicals-adhesives-and-coatings-arc-products' => [
                ['name' => 'Loctite Threadlocker 242 Medium', 'price' => 18.50, 'image' => '/images/products/wd40.png'],
                ['name' => 'High-Strength Industrial RTV Silicone', 'price' => 12.00, 'image' => '/images/products/wd40.png'],
                ['name' => 'Heavy-Duty Anti-Seize Lubricant', 'price' => 22.00, 'image' => '/images/products/wd40.png'],
                ['name' => 'Cyanoacrylate Instant Adhesive Glue', 'price' => 9.50, 'image' => '/images/products/wd40.png'],
            ],
            'rubber-gaskets-and-seals-packing-and-seals-utex-braided-packing' => [
                ['name' => 'PTFE Compression Valve Stem Packing', 'price' => 45.00, 'image' => '/images/products/packing-sealing-v2.png'],
                ['name' => 'Graphite Pump Gland Packing Cord', 'price' => 60.00, 'image' => '/images/products/packing-sealing-v2.png'],
            ],
            'rubber-gaskets-and-seals-specialty-molded-parts' => [
                ['name' => 'Mechanical Pump Shaft Seal Assembly', 'price' => 180.00, 'image' => '/images/products/packing-sealing-v2.png'],
            ],
            'safety-gear-and-supplies-ppe-safety-products' => [
                ['name' => 'Premium ABS Safety Hard Hat Yellow', 'price' => 24.00, 'image' => '/images/products/safety-gear-v2.png'],
                ['name' => 'Heavy-Duty Split-Cowhide Work Gloves', 'price' => 14.50, 'image' => '/images/products/safety-gear-v2.png'],
                ['name' => 'Professional Noise-Reduction Ear Muffs', 'price' => 29.00, 'image' => '/images/products/safety-gear-v2.png'],
                ['name' => 'High-Visibility Class 2 Safety Vest', 'price' => 12.90, 'image' => '/images/products/safety-gear-v2.png'],
                ['name' => 'Anti-Fog Scratch-Resistant Safety Glasses', 'price' => 8.50, 'image' => '/images/products/safety-gear-v2.png'],
                ['name' => 'Industrial First Aid Kit Wall-Cabinet', 'price' => 75.00, 'image' => '/images/products/safety-gear-v2.png'],
            ],
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


    public static function defaultProductsForSubcategory(
        string $subcategoryName,
        string $subcategorySlug,
        string $image,
        int $needed,
        int $startIndex = 0
    ): array {
        $variants = ['Standard', 'Heavy-Duty', 'Premium', 'Industrial', 'Replacement', 'OEM Compatible', 'Pro Series'];
        $products = [];

        for ($i = 0; $i < $needed; $i++) {
            $variant = $variants[($startIndex + $i) % count($variants)];
            $products[] = [
                'name' => "{$subcategoryName} - {$variant}",
                'slug' => self::slugify("{$subcategorySlug}-{$variant}-".($startIndex + $i + 1)),
                'price' => round(18.50 + (($startIndex + $i + 1) * 12.75), 2),
                'image' => $image,
            ];
        }

        return $products;
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
