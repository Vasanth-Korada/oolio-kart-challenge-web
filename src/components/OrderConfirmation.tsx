import type { Order } from "../api/types";
import { formatCurrency } from "../utils/format";

export function OrderConfirmation({ order, onDismiss }: { order: Order; onDismiss: () => void }) {
  return (
    <aside className="cart">
      <h2>Order confirmed</h2>
      <p className="order-confirmation__id">Order #{order.id}</p>
      <ul className="cart__lines">
        {order.items.map((item) => {
          const product = order.products.find((p) => p.id === item.productId);
          return (
            <li key={item.productId} className="cart__line">
              <div className="cart__line-info">
                <span className="cart__line-name">
                  {product?.name ?? `Product ${item.productId}`} × {item.quantity}
                </span>
                {product && (
                  <span className="cart__line-price">{formatCurrency(product.price * item.quantity)}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="order-totals">
        <div className="order-totals__row">
          <span>Subtotal</span>
          <span>{formatCurrency(order.subtotal)}</span>
        </div>
        {order.discount > 0 && (
          <div className="order-totals__row order-totals__row--discount">
            <span>Coupon {order.couponCode} (5% off)</span>
            <span>−{formatCurrency(order.discount)}</span>
          </div>
        )}
        <div className="order-totals__row order-totals__row--total">
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </div>

      <button type="button" onClick={onDismiss}>
        Order more
      </button>
    </aside>
  );
}
