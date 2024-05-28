export type Routes = {
  HomePage: undefined;
  ConfigurePage: undefined;
  CameraPage: { numPeople: number };
  PreviewPage: { imgsrc: string, numPeople: number };
  AnalysisPage: { imgsrc: string, numPeople: number };
  ResultPage: { resultMap: Map<number, number> };
}