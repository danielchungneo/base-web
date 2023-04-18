import { IFontSizeVariant } from "./common";

export interface ILabel {
  children: React.ReactNode;
  className?: string;
  variant?: IFontSizeVariant;

  [key: string]: any;
}

export interface IAccordion {
  /**
   * className for the accordion wrapper
   */
  className?: string;

  /**
   * array of accordion items
   */
  items: any[];

  /**
   * optional key extractor for rendering
   */
  keyExtractor?: (item: any, index: number) => string;

  /**
   * rendering function for accordion header/title
   * @description the wrapper is setup to render a full width flex row with a space-between layout.  Return an array of children to have them spaced out across the title area
   */
  renderTitle: (item: any, index: number) => React.ReactNode;

  /**
   * rendering function for accordion content
   */
  renderContent: (item: any, index: number) => React.ReactNode;

  /**
   * whether to show or hide line number on the left side of the accordion item
   * @default true
   */
  showLineNumbers?: boolean;
}
