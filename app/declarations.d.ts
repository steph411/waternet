import * as React from 'react';

declare global {
  
  declare namespace JSX {
    interface IntrinsicElements {
      "vaadin-combo-box": any;
    }
  }
}

declare module uuid4{}