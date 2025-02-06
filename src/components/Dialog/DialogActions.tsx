import { Button, LoadingButton } from '@/components';
import DialogActionsProps from './DialogActionsProps';

export default function DialogActions({children, loading, showButtonSubmit, handleClose}:DialogActionsProps) {
    return (
        <footer className="flex gap-3 justify-end items-center flex-shrink-0 py-2 px-3 border-t border-white/5">
            {children}
            {handleClose && <Button onClick={handleClose} disabled={loading} type='button' roundedLarger className='text-red-400 items-center px-8 border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 disabled:text-red-400/25'>Fechar</Button>}
            {showButtonSubmit && <LoadingButton loading={loading} type='submit' roundedLarger className='px-8'>Salvar</LoadingButton>}
        </footer>
    )
}
