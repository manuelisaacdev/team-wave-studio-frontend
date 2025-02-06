import { useId, useState } from 'react';

export default function useTabs(value: number) {
    const ids = Array.from({ length: value }, () => useId());
    const [tabs, setTabs] = useState<string>(ids[0]);
    return {tabs, setTabs, ids};
}
