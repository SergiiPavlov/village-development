import clsx from 'clsx';import {ComponentProps} from 'react';
type Props=ComponentProps<'button'>&{variant?:'primary'|'ghost'};
export default function Button({className,variant='primary',...rest}:Props){
  return <button className={clsx('btn',variant==='primary'?'btn-primary':'btn-ghost',className)} {...rest}/>}
