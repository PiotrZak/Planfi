const breakPoints = {
  s: '276px',
  sm: '576px',
  md: '768px',
  lg: '1024px',
  xl: '1440px',
}

interface IBreakPoints {
  xs: string,
  sm: string,
  md: string,
  lg: string,
}

const breakPointSize: IBreakPoints = {
  xs: `(max-width: ${breakPoints.sm})`,
  sm: `(max-width: ${breakPoints.md})`,
  md: `(max-width: ${breakPoints.lg})`,
  lg: `(max-width: ${breakPoints.xl})`,
}

export default breakPointSize
