export type Routes = {
  History: undefined;
  HomePage: undefined;
  ConfigurePage: undefined;
  CameraPage: { participants: Array<{name: string}> };
  PreviewPage: { imgsrc: string, participants: Array<{name: string}>  };
  AnalysisPage: { imgsrc: string, participants: Array<{name: string}>  };
  ResultPage: { resultArray: Array<{name: string, amount: number}> };
}