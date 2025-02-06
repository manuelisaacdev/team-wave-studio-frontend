import { useQuery } from '@tanstack/react-query';
import CountryService from '@/services/CountryService';

const countryService = new CountryService();

export default function useCountries() {
    return useQuery({
        queryKey: ['countries'],
        retryOnMount: false,
        refetchOnMount: false,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        queryFn: () => countryService.findAll(),
    });
}
