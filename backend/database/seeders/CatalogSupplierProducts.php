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
    public const SLUG_BELT_TRANS_PKG = 'conveyor-solutions-conveyor-belt-trans-pkg-belt';
    public const SLUG_AIR_RUBBER = 'hose-and-fittings-industrial-hose-air-multi-purpose-rubber-hose';
    public const SLUG_CHEMICAL = 'hose-and-fittings-industrial-hose-chemical-paint-fluid-hose';
    public const SLUG_WATER_DISCHARGE = 'hose-and-fittings-industrial-hose-water-discharge-rubber-pvc';
    public const SLUG_STEAM = 'hose-and-fittings-industrial-hose-steam-hose';
    public const SLUG_MISC_HOSE = 'hose-and-fittings-industrial-hose-misc-hose';
    public const SLUG_MARINE = 'hose-and-fittings-industrial-hose-marine-exhaust-coolant-hose';
    public const SLUG_MISC_FITTINGS = 'hose-and-fittings-fittings-and-couplings-misc-fittings';
    public const SLUG_V_BELTS = 'power-transmission-v-belts-v-belts-domestic-import';
    public const SLUG_POLYCHAIN = 'power-transmission-synchronous-specialty-belts-polychain';
    public const SLUG_HTD = 'power-transmission-synchronous-specialty-belts-htd-belt-and-sprockets';
    public const SLUG_DODGE_TAPER = 'power-transmission-bushings-dodge-taper-lock';
    public const SLUG_ROLLER_CHAIN = 'power-transmission-chain-and-sprockets-roller-chain-domestic-import';
    public const SLUG_MISC_PT = 'power-transmission-misc-power-transmission-misc-power-transmission';

    /**
     * @return list<array<string, mixed>>
     */
    public static function all(): array
    {
        return array_merge(
            require __DIR__.'/data/supplier-products/conveyor.php',
            require __DIR__.'/data/supplier-products/conveyor-batch2.php',
            require __DIR__.'/data/supplier-products/rubber.php',
            require __DIR__.'/data/supplier-products/hose.php',
            require __DIR__.'/data/supplier-products/hose-wellcall-batch2.php',
            require __DIR__.'/data/supplier-products/hose-dixon.php',
            require __DIR__.'/data/supplier-products/power-transmission.php',
            require __DIR__.'/data/supplier-products/fire-flexco.php',
        );
    }
}
