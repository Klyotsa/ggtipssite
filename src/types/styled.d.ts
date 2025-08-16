import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      text: string;
      accent: string;
    };
    fonts: {
      body: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}

declare module '@styled-icons/material/*' {
  import { StyledIcon } from '@styled-icons/styled-icon';
  const Icon: StyledIcon;
  export default Icon;
}

declare module '@styled-icons/evaicons-outline/*' {
  import { StyledIcon } from '@styled-icons/styled-icon';
  const Icon: StyledIcon;
  export default Icon;
}

declare module '@styled-icons/boxicons-regular/*' {
  import { StyledIcon } from '@styled-icons/styled-icon';
  const Icon: StyledIcon;
  export default Icon;
} 