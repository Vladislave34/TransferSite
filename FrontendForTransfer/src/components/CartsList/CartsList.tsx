import {cartApi} from "../../services/CartService/CartService.ts";
import CartCard from "../../UI/CartCard/CartCard.tsx";



const CartsList = () => {
    const {data} = cartApi.useFetchAllCartsQuery();
    return (
        <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-10">
                {data?.map((cart) => (
                    <CartCard item={
                        cart
                    } key={cart?.id}  />
                ))}
            </div>
        </div>
    );
};

export default CartsList;