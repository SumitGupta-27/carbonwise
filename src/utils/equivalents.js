// Rough, widely-cited conversion factors used purely for intuition-building.
const KM_PER_KG_CO2 = 1 / 0.192 // average passenger car ~192 g CO2e/km
const KG_CO2_PER_ELECTRICITY_DAY = 5.5 // average household electricity/day
const KG_CO2_ABSORBED_PER_TREE_YEAR = 21 // average mature tree/year

export function toDrivingKm(kg) {
  return Math.round(kg * KM_PER_KG_CO2)
}

export function toElectricityDays(kg) {
  return Math.round((kg / KG_CO2_PER_ELECTRICITY_DAY) * 10) / 10
}

export function toTreesNeeded(kg) {
  return Math.max(1, Math.round(kg / KG_CO2_ABSORBED_PER_TREE_YEAR))
}

export function buildImpactComparisons(kg) {
  return [
    {
      key: 'driving',
      value: toDrivingKm(kg),
      unit: 'km',
      label: 'of driving in an average car',
    },
    {
      key: 'electricity',
      value: toElectricityDays(kg),
      unit: 'days',
      label: 'of household electricity use',
    },
    {
      key: 'trees',
      value: toTreesNeeded(kg),
      unit: 'trees',
      label: 'needed for a year to absorb this',
    },
  ]
}
