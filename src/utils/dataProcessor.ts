// The processTableData function groups crops by year and finds the max and min production crop for each year.

export interface CropData {
    country: string;
    year: string;
    cropName: string;
    production: number;
    yield: number;
    area: number;
  }
  
  export interface AggregatedData {
    year: string;
    maxCrop: string;
    minCrop: string;
  }
  
  export interface BarChartData {
    cropName: string;
    avgYield: number;
  }
  
  export const sanitizeData = (data: any[]): CropData[] => {
    return data.map((item) => ({
      country: item.Country || 'Unknown',
      year: item.Year?.split(',')[1]?.trim() || 'Unknown',
      cropName: item['Crop Name'] || 'Unknown',
      production: item['Crop Production (UOM:t(Tonnes))'] || 0,
      yield: item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] || 0,
      area: item['Area Under Cultivation (UOM:Ha(Hectares))'] || 0,
    }));
  };
  
  export const processTableData = (data: CropData[]): AggregatedData[] => {
    const groupedByYear = data.reduce((acc, curr) => {
      if (!acc[curr.year]) acc[curr.year] = [];
      acc[curr.year].push(curr);
      return acc;
    }, {} as Record<string, CropData[]>);
  
    return Object.entries(groupedByYear).map(([year, crops]) => {
      const maxCrop = crops.reduce((max, curr) => (curr.production > max.production ? curr : max));
      const minCrop = crops.reduce((min, curr) => (curr.production < min.production ? curr : min));
  
      return {
        year,
        maxCrop: maxCrop.cropName,
        minCrop: minCrop.cropName,
      };
    });
  };
  
  export const processBarChartData = (data: CropData[]): BarChartData[] => {
    const groupedByCrop = data.reduce((acc, curr) => {
      if (!acc[curr.cropName]) acc[curr.cropName] = { cropName: curr.cropName, totalYield: 0, count: 0 };
      acc[curr.cropName].totalYield += curr.yield;
      acc[curr.cropName].count += 1;
      return acc;
    }, {} as Record<string, { cropName: string; totalYield: number; count: number }>);
  
    return Object.values(groupedByCrop).map((item) => ({
      cropName: item.cropName,
      avgYield: item.totalYield / item.count,
    }));
  };
  