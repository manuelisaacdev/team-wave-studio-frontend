import { useAppSelector } from '@/redux/hooks';
import { selectSession } from '@/redux/slicer/sessionSlicer';

export default function useSelectSession() {
    return useAppSelector(selectSession);
}
