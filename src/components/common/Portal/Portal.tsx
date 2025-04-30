import { cloneElement } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactElement;
  isOpen: boolean;
  id?: string;
}

function Portal({ children, isOpen, id }: PortalProps) {
  return isOpen
    ? createPortal(cloneElement(children), document.getElementById(id || 'portal') as HTMLElement)
    : null;
}

export default Portal;
