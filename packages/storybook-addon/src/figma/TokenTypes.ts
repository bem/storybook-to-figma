export type Token = {
    name: string;
    value: TokenValue;
    description?: string;
};

export type TokenColor = {
    borderColor?: string;
    fill?: string;
}

export type TokenSpace = {
    paddingLeft?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingTop?: number;
    itemSpacing?: number;
}

export type TokenBorder = {
    borderWidth?: number;
    borderRadiusTopLeft?: number;
    borderRadiusTopRight?: number;
    borderRadiusBottomLeft?: number;
    borderRadiusBottomRight?: number;
}

export type TokenSize = {
    width?: number | string;
    height?: number | string;
    sizing?: number | string;
}

export type TokenTypography = {
    fontWeight?: number;
    lineHeight?: number;
    fontSize?: number;
    letterSpacing?: number;
    paragraphSpacing?: number;
}

export type TokenOpacity = {
    opacity?: number;
}

export type TokenFontFamily = {
    fontFamily?: string,
}

export type TokenBoxShadow = {
    boxShadow?: {
        x: number
        y: number
        spread: number;
        color: string;
        blur: number;
    }
}

export interface TokenValue extends TokenTypography, TokenSpace, TokenSize, TokenBorder, TokenBoxShadow, TokenOpacity, TokenFontFamily, TokenColor {
}

export type TokenValueKeys = keyof TokenValue;

const fontFamilyBase: Required<TokenFontFamily> = { 
    fontFamily: "",
};

const colorBase: Required<TokenColor> = { 
    fill: "",
    borderColor: ""
};

const spacingBase: Required<TokenSpace> = { 
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
    itemSpacing: 0
};

const sizeBase: Required<TokenSize> = { 
    sizing: 0,
    width: 0,
    height: 0,
}

const typoBase: Required<TokenTypography> = { 
    fontWeight: 0,
    lineHeight: 0,
    fontSize: 0,
    letterSpacing: 0,
    paragraphSpacing: 0
}

const borderBase: Required<TokenBorder> = { 
    borderWidth: 0,
    borderRadiusTopLeft: 0,
    borderRadiusTopRight: 0,
    borderRadiusBottomLeft: 0,
    borderRadiusBottomRight: 0
}

export type tokenValueKeys = keyof TokenValue;

export const TokenKeys = {
    spacing: ['itemSpacing', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'] as tokenValueKeys[],
    size: Object.keys(sizeBase) as tokenValueKeys[],
    font: ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'paragraphSpacing'] as tokenValueKeys[],
    border: Object.keys(borderBase) as tokenValueKeys[],
    color: Object.keys(colorBase) as tokenValueKeys[],
    fontFamily: Object.keys(fontFamilyBase) as tokenValueKeys[],
}