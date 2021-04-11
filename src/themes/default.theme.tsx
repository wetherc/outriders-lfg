export const breakpoints = {
  xsmall: 0,
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200
};

export const Default = {
  select: {
    background: 'white',
    icons: {
      color: '#65A100'
    }
  },
  global: {
    breakpoints: {
      small: {
        value: breakpoints.small
      },
      medium: {
        value: breakpoints.medium
      },
      large: {
        value: breakpoints.large
      },
      xlarge: {
        value: breakpoints.xlarge
      }
    }
  }
};

export default Default;
