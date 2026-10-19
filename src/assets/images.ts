/**
 * Centralized Image Assets Catalog
 * Using standard Vite static imports ensures all assets are bundled, hashed,
 * and copied to `dist/assets/` during `npm run build` for seamless Netlify/GitHub deployment.
 */

// Environment Biome Backgrounds
import heroLandscape from './images/ecosystem_hero_landscape_1792398961208.jpg';
import envTropicalForest from './images/env_tropical_forest_1792401951707.jpg';
import envRiverBank from './images/env_river_bank_1792401952220.jpg';
import envFreshwaterPond from './images/env_freshwater_pond_1792401952257.jpg';

// Food Web & Ecosystem Panoramic
import foodWebPanoramic from './images/food_web_panoramic_1792403743526.jpg';
import foodWebCreatures from './images/food_web_creatures_1792398962778.jpg';
import nutrientEnergyCycle from './images/nutrient_energy_cycle_1792398962535.jpg';

// 3.1 Hubungan Dua Arah Diagrams
import diagramPlantPhotosynthesis from './images/diagram_plant_photosynthesis_roots_1792404221853.jpg';
import matPlantWaterSoil from './images/mat_plant_water_soil_1792404308449.jpg';
import matFishWaterOxygen from './images/mat_fish_water_oxygen_1792404307216.jpg';
import diagramDecomposerHumus from './images/diagram_decomposer_humus_soil_1792404223323.jpg';
import matTreeShadeTemp from './images/mat_tree_shade_temp_1792404308790.jpg';
import matRiverbankRoots from './images/mat_riverbank_roots_1792404331283.jpg';

// 3.2 Interaksi Antarmakhluk Hidup Diagrams
import diagramPredationFrog from './images/diagram_symbiosis_predation_frog_1792404223028.jpg';
import matPlantCompetition from './images/mat_plant_competition_1792404331309.jpg';
import diagramMutualismBee from './images/diagram_symbiosis_mutualism_bee_1792404221578.jpg';
import matParasiteHost from './images/mat_parasite_host_1792404331573.jpg';

// 3.3 & 3.4 Food Chain & Energy Pyramid
import matRiceFoodChain from './images/mat_rice_food_chain_1792404352775.jpg';
import matEnergyPyramidHeat from './images/mat_energy_pyramid_heat_1792404352632.jpg';

export const IMAGES = {
  // Biomes
  heroLandscape,
  envTropicalForest,
  envRiverBank,
  envFreshwaterPond,

  // Panoramics & Big Charts
  foodWebPanoramic,
  foodWebCreatures,
  nutrientEnergyCycle,

  // 3.1
  plantLightPhotosynthesis: diagramPlantPhotosynthesis,
  plantWaterSoil: matPlantWaterSoil,
  animalWaterOxygen: matFishWaterOxygen,
  decomposerSoilHumus: diagramDecomposerHumus,
  treeSoilTemp: matTreeShadeTemp,
  riverbankVegetationRoots: matRiverbankRoots,

  // 3.2
  predationFrog: diagramPredationFrog,
  competitionPlants: matPlantCompetition,
  mutualismBee: diagramMutualismBee,
  parasiteHost: matParasiteHost,

  // 3.3 & 3.4
  riceFoodChain: matRiceFoodChain,
  energyPyramidHeat: matEnergyPyramidHeat,
} as const;

export type ImageKey = keyof typeof IMAGES;
