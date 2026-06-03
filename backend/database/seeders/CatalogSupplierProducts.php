<?php

namespace Database\Seeders;

class CatalogSupplierProducts
{
    public const SLUG_BELT_HEAVY = 'conveyor-solutions-conveyor-belt-heavy-duty-belt-domestic-import';
    public const SLUG_BELT_INCLINE = 'conveyor-solutions-conveyor-belt-incline-roughtop-belt';
    public const SLUG_BELT_WOVEN = 'conveyor-solutions-conveyor-belt-woven-belt';
    public const SLUG_FASTENERS_CLIPPER = 'conveyor-solutions-belt-accessories-fasteners-clipper';
    public const SLUG_FASTENERS_FLEXCO = 'conveyor-solutions-belt-accessories-fasteners-flexco-alligator';
    public const SLUG_BELT_SPLICE = 'conveyor-solutions-belt-accessories-belt-splice-material';
    public const SLUG_SKIRTBOARD = 'conveyor-solutions-skirtboard-and-lining-skirtboard-rubber';
    public const SLUG_PULLEY_LAGGING = 'conveyor-solutions-conveyor-components-pulley-lagging';
    public const SLUG_MISC_CONVEYOR = 'conveyor-solutions-conveyor-components-misc-conveyor-components';
    public const SLUG_SHEET_RED = 'rubber-gaskets-and-seals-sheet-rubber-red-rubber';
    public const SLUG_SHEET_CLOTH = 'rubber-gaskets-and-seals-sheet-rubber-cloth-inserted';
    public const SLUG_SHEET_MATTING = 'rubber-gaskets-and-seals-sheet-rubber-matting';
    public const SLUG_MATERIAL_HANDLING = 'hose-and-fittings-industrial-hose-material-handling-hose';
    public const SLUG_DUCTING = 'hose-and-fittings-industrial-hose-ducting-vacuum-hose';
    public const SLUG_FIRE_MILL = 'hose-and-fittings-industrial-hose-fire-mill-hose';
    public const SLUG_CAM_GROOVE = 'hose-and-fittings-fittings-and-couplings-cam-and-groove-domestic-import';
    public const SLUG_WORM_CLAMPS = 'hose-and-fittings-clamps-worm-gear-clamps';
    public const SLUG_WASHDOWN = 'hose-and-fittings-industrial-hose-hot-water-washdown-hose';
    public const SLUG_WATER_SUCTION = 'hose-and-fittings-industrial-hose-water-suction-rubber-pvc';
    public const SLUG_FOOD_RUBBER = 'hose-and-fittings-industrial-hose-food-and-beverage-rubber-hose';
    public const SLUG_PETROLEUM = 'hose-and-fittings-industrial-hose-petroleum-hose';
    public const SLUG_NOZZLES = 'hose-and-fittings-fire-equipment-nozzles-water';

    /**
     * @return list<array<string, mixed>>
     */
    public static function all(): array
    {
        return array_merge(
            require __DIR__.'/data/supplier-products/conveyor.php',
            require __DIR__.'/data/supplier-products/rubber.php',
            require __DIR__.'/data/supplier-products/hose.php',
            require __DIR__.'/data/supplier-products/fire-flexco.php',
        );
    }
}
