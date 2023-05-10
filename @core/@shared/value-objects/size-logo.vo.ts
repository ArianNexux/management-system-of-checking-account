export default class SizeLogo {
  private _height: number;
  private _width: number;

  constructor(height: number, width: number) {
    this._height = height;
    this._width = width;
  }

  get height(): number {
    return this._height;
  }

  get width(): number {
    return this._width;
  }
}
