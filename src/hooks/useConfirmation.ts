import { useContext } from 'react';
import { ConfirmationContext } from '@/contexts/ConfirmationProvider';

export default function useConfirmation() {
    return useContext(ConfirmationContext);
}
