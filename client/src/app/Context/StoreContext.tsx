import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quanity: number) => void;
}

export const StoreContex = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContex);

    if (context === undefined) {
        throw Error('Not seem to be inside provider');
    }

    return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId: number, quanity: number) {
        if (!basket) return;

        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);
        if (itemIndex >= 0) {
            items[itemIndex].quanity -= quanity;
            if (items[itemIndex].quanity === 0) items.splice(itemIndex, 1);

            setBasket(prevState => {
                return { ...prevState!, items }
            })
        }
    }

    return (
        <StoreContex.Provider value={{ basket, setBasket, removeItem }}>
            {children}
        </StoreContex.Provider>
    )
}