<?php

namespace Database\Seeders;

class CatalogTaxonomy
{
    /**
     * Full product group → category → subcategory taxonomy.
     *
     * @return list<array{
     *     name: string,
     *     is_featured?: bool,
     *     image?: string,
     *     categories: list<array{
     *         name: string,
     *         subcategories: list<string|array{name: string, description?: string}>
     *     }>
     * }>
     */
    public static function productGroups(): array
    {
        return [
            [
                'name' => 'Conveyor Solutions',
                'is_featured' => true,
                'image' => '/images/products/conveyor-belt.png',
                'categories' => [
                    [
                        'name' => 'Conveyor Belt',
                        'subcategories' => [
                            'Heavy Duty Belt (Domestic + Import)',
                            'PVC Belt',
                            'Woven Belt',
                            'Incline / Roughtop Belt',
                            'Food Belt',
                            'Urethane Profile Belt',
                            'Trans/Pkg Belt',
                            'European Belt',
                            'High Speed Transmission Belt',
                            'Misc. Belting',
                        ],
                    ],
                    [
                        'name' => 'Belt Accessories',
                        'subcategories' => [
                            'Fasteners — Clipper',
                            'Fasteners — Flexco / Alligator',
                            'Leather Lace',
                            'Cleats',
                            'V-Guide',
                            'Misc. Belt Accessories',
                            'Belt Splice Material',
                        ],
                    ],
                    [
                        'name' => 'Skirtboard & Lining',
                        'subcategories' => [
                            'Skirtboard Rubber',
                        ],
                    ],
                    [
                        'name' => 'Conveyor Components',
                        'subcategories' => [
                            'Idlers',
                            'Conveyor Pulleys',
                            'Pulley Lagging',
                            'Buckets',
                            'Conveyor Chain',
                            'Sprockets — Conveyor Chain',
                            'Misc. Conveyor Components',
                        ],
                    ],
                    [
                        'name' => 'Field Services',
                        'subcategories' => [
                            'Field Splice Labor',
                            'Conveyor System Design & Consultation',
                            'On-Site Installation & Repair',
                            'Emergency Conveyor Repair',
                            'Scheduled Maintenance Programs',
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Power Transmission',
                'is_featured' => true,
                'image' => '/images/products/motors-control.png',
                'categories' => [
                    [
                        'name' => 'V-Belts',
                        'subcategories' => [
                            'V-Belts (Domestic + Import)',
                            'Banded V-Belt (Domestic + Import)',
                            'Variable Speed Belts (Domestic + Import)',
                            'Poly-V Belt & Sheaves',
                            'Misc. Power Transmission Belts',
                        ],
                    ],
                    [
                        'name' => 'Synchronous / Specialty Belts',
                        'subcategories' => [
                            'HTD Belt & Sprockets',
                            'Polychain',
                            'Timing Belt & Sprockets (Domestic + Import)',
                        ],
                    ],
                    [
                        'name' => 'Bushings',
                        'subcategories' => [
                            'Dodge Taper Lock',
                            'Link Belt Taper Lock',
                            'Diamond Taper Lock',
                            'Woods QD',
                            'Maury QD',
                            'Gates QD',
                            'Durkee QD',
                            'Dodge QD',
                            'Uniroyal QD',
                            'Misc QD Bushings',
                        ],
                    ],
                    [
                        'name' => 'Chain & Sprockets',
                        'subcategories' => [
                            'Roller Chain (Domestic + Import)',
                            'Roller Chain Sprockets',
                            'Sureflex Couplings',
                        ],
                    ],
                    [
                        'name' => 'Gearboxes & Reducers',
                        'subcategories' => [
                            'Gearmotors & Reducers',
                        ],
                    ],
                    [
                        'name' => 'Misc. Power Transmission',
                        'subcategories' => [
                            'Misc. Power Transmission',
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Bearings',
                'image' => '/images/products/bearing.png',
                'categories' => [
                    [
                        'name' => 'Bearings',
                        'subcategories' => [
                            [
                                'name' => 'All Types',
                                'description' => 'Pillow Block, Flanged, Roller, Spherical, Taper, Take-Up, Needle, Cam Followers, Rod Ends',
                            ],
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Hose & Fittings',
                'is_featured' => true,
                'image' => '/images/products/industrial-hose.png',
                'categories' => [
                    [
                        'name' => 'Industrial Hose',
                        'subcategories' => [
                            'Air / Multi-Purpose Rubber Hose',
                            'Air / Multi-Purpose PVC Hose',
                            'Chemical / Paint / Fluid Hose',
                            'Ducting / Vacuum Hose',
                            'Fire / Mill Hose',
                            'Food & Beverage Rubber Hose',
                            'Food & Beverage PVC Hose',
                            'Marine Exhaust / Coolant Hose',
                            'Material Handling Hose',
                            'Metal Hose',
                            'Petroleum Hose',
                            'Spray Hose',
                            'Steam Hose',
                            'Water Discharge (Rubber + PVC)',
                            'Water Suction (Rubber + PVC)',
                            'Hot Water Washdown Hose',
                            'Misc. Hose',
                            'Integraflex Composite Hose',
                        ],
                    ],
                    [
                        'name' => 'Tubing',
                        'subcategories' => [
                            'Clear Vinyl Tubing',
                            'Braided Vinyl Tubing',
                            'Neoprene Tubing',
                            'Gum Tubing',
                            'Silicone Tubing',
                            'Misc. Tubing',
                        ],
                    ],
                    [
                        'name' => 'Hydraulic Hose',
                        'subcategories' => [
                            'Aeroquip',
                            'NRP Jones',
                            'Dayco Hydraulics',
                            'Synflex',
                            'Goodyear Hydraulic',
                            'Misc. Hydraulics',
                        ],
                    ],
                    [
                        'name' => 'Hose Assemblies',
                        'subcategories' => [
                            'Import Rubber Assemblies',
                            'PVC Air Hose Assemblies',
                            'PVC Discharge Assemblies',
                            'PVC Suction Assemblies',
                        ],
                    ],
                    [
                        'name' => 'Fittings & Couplings',
                        'subcategories' => [
                            'Cam & Groove (Domestic + Import)',
                            'Import Combo Nipples',
                            'Import Pin Lug Couplings',
                            'Dom Fittings (Dixon)',
                            'Internal Expansion Couplings',
                            'Industrial Crimp Fittings',
                            'Small Hose Ferrules',
                            'Brass Fittings',
                            'Misc. Fittings',
                            'Hydraulic Adapters',
                            'Instrument Fittings & Tubing',
                            'TTMA Flange Fittings',
                            'Hammer Unions',
                            'MIL-Spec Cam & Groove',
                        ],
                    ],
                    [
                        'name' => 'Clamps',
                        'subcategories' => [
                            'Worm Gear Clamps',
                            'Preformed Clamps',
                            'Marman Clamps',
                            'Band-It',
                            'Amflo',
                            'National Coupling & Dixlock',
                        ],
                    ],
                    [
                        'name' => 'Fire Equipment',
                        'subcategories' => [
                            'Fire Hose Couplings & Nozzles',
                            'Nozzles — Water',
                            'Fire Hose Couplings & Accessories',
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Pipe, Valves & Fittings',
                'image' => '/images/products/pipe-valves.png',
                'categories' => [
                    [
                        'name' => 'Pipe & Tubing',
                        'subcategories' => [
                            'Pipe & Tubing',
                            'Pipe Fittings',
                        ],
                    ],
                    [
                        'name' => 'Valves',
                        'subcategories' => [
                            'Apollo',
                            'Cameron / WKM',
                            'Conval',
                            'GC Valves',
                            'Vogt',
                            'McCanna / Flowserve / Marpac',
                            'Burkert',
                            'Kip Valves',
                            'Dema',
                            'Valve Check',
                            'Misc. Valves',
                        ],
                    ],
                    [
                        'name' => 'Gauges',
                        'subcategories' => [
                            'Ashcroft',
                            'Noshok',
                            'Reconditioned Gauges',
                            'Misc. Gauges',
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Flow Control & Instrumentation',
                'image' => '/images/products/pipe-valves.png',
                'categories' => [
                    [
                        'name' => 'Steam & Piping',
                        'subcategories' => [
                            'Steam Traps — Emerson / Yarway',
                            'Yarway Power / BOV Hydrop',
                            'Armstrong Steam Traps',
                            'Mueller Strainers',
                            'Strahman',
                        ],
                    ],
                    [
                        'name' => 'Instrumentation',
                        'subcategories' => [
                            'Emerson / Penberthy',
                            'Maxos Glass',
                            'Tubular Glass',
                            'United Electric',
                            'Bacharach',
                            'RTI Filters',
                            'Crane',
                            'Circle / Circor',
                            'Parker Hannifin',
                            'DFT / Durabla',
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Rubber, Gaskets & Seals',
                'image' => '/images/products/oil-seal.png',
                'categories' => [
                    [
                        'name' => 'Sheet Rubber',
                        'subcategories' => [
                            'Neoprene',
                            'Gum Rubber',
                            'Red Rubber',
                            'EPDM',
                            'Butyl',
                            'Buna-N',
                            'Silicone',
                            'Hypalon',
                            'Cloth Inserted',
                            'Diaphragm',
                            'Linatex',
                            'Viton',
                            'Teflon',
                            'Graphite Sheet',
                            'Cork / Neoprene',
                            'Vegetable Fibre Sheet',
                            'Open / Closed Cell Sponge',
                            'Silicone Sponge',
                            'CCS Stripping',
                            'Matting',
                            'Caltrans Material',
                        ],
                    ],
                    [
                        'name' => 'Gaskets',
                        'subcategories' => [
                            'Full Face / Ring Gaskets',
                            'Spiral Wound Gaskets',
                            'Compressed Non-Asbestos Sheet',
                            'Gore-Tex',
                        ],
                    ],
                    [
                        'name' => 'Packing & Seals',
                        'subcategories' => [
                            'Utex / Braided Packing',
                            'Misc. Packing',
                            'O-Ring Cord Stock',
                            'O-Ring Kits',
                        ],
                    ],
                    [
                        'name' => 'Specialty',
                        'subcategories' => [
                            'UHMW',
                            'Molded Parts',
                            'Extruded Parts',
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Adhesives, Lubricants & Chemicals',
                'image' => '/images/products/wd40.png',
                'categories' => [
                    [
                        'name' => 'Lubricants & Maintenance',
                        'subcategories' => [
                            'Greases & Lubricants',
                            'Pulsarlube',
                            'Cutting Fluids',
                            'Corrosion Control',
                            'Clean & Degrease',
                            'Maintenance Specialties',
                            'Accessories',
                        ],
                    ],
                    [
                        'name' => 'Adhesives & Coatings',
                        'subcategories' => [
                            'ARC Products',
                            'Cast Polymer, Chemicals & Coatings',
                            'Fluid Coating Products',
                            'Rezcast',
                        ],
                    ],
                    [
                        'name' => 'Safety Chemicals',
                        'subcategories' => [
                            'Spray Paint',
                            'Chemicals',
                            'Chalk & Crayons',
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Safety Gear & Supplies',
                'image' => '/images/products/safety-gear-v2.png',
                'categories' => [
                    [
                        'name' => 'PPE',
                        'subcategories' => [
                            'Rainwear / Gloves / Boots',
                            'Safety Products',
                        ],
                    ],
                    [
                        'name' => 'Tools & Abrasives',
                        'subcategories' => [
                            'Abrasives',
                            'Tools',
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Hardware & Fasteners (Aztec)',
                'image' => '/images/products/conveyor-components.png',
                'categories' => [
                    [
                        'name' => 'Nuts & Bolts',
                        'subcategories' => [
                            'Nuts & Bolts',
                        ],
                    ],
                    [
                        'name' => 'Misc. Hardware (Cisco)',
                        'subcategories' => [
                            'Misc. Hardware (Cisco)',
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Electric Motors',
                'image' => '/images/products/motors-control.png',
                'categories' => [
                    [
                        'name' => 'Electric Motors',
                        'subcategories' => [
                            'Electric Motors',
                        ],
                    ],
                ],
            ],
        ];
    }

    public static function slug(string $name, ?string $parentSlug = null): string
    {
        $base = CatalogMockData::slugify($name);

        if ($parentSlug) {
            return "{$parentSlug}-{$base}";
        }

        return $base;
    }

    /**
     * @param  string|array{name: string, description?: string}  $entry
     * @return array{name: string, description?: string}
     */
    public static function normalizeSubcategoryEntry(string|array $entry): array
    {
        if (is_string($entry)) {
            return ['name' => $entry];
        }

        return $entry;
    }
}
