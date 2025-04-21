export const palette = {
    primary: { bg: 'bg-[#824DFF]',  border: 'border-[#824DFF]',  text: 'text-white',  hover: 'hover:bg-[#6D0EF1]'},    
    inactive:  { bg: 'bg-[#998DBF]',    border: 'border-[#998DBF]',  text: 'text-white',   hover: 'hover:bg-[#6E5CA3]' },
    green:     { bg: 'bg-[#319B31]',  border: 'border[#319B31]', text: 'text-white',  hover: 'hover:bg-[#247524]' },
    red: { bg: 'bg-[#D22D5C]',  border: 'border-[#D22D5C]',  text: 'text-white',  hover: 'hover:bg-[#A82443]' },
    disabled:  { bg: 'bg-[#E2DEED]',   border: 'border-[#E2DEED]',  text: 'text-[#998DBF]',   hover:'' },
  } as const;
  
  export type PaletteKey = keyof typeof palette;
  