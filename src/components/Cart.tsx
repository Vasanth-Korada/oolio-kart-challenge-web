import { useState } from "react";
import { ApiRequestError, placeOrder } from "../api/client";
import type { Order } from "../api/types";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";
import { OrderConfirmation } from "./OrderConfirmation";

export function Cart() {
  const { lines, setQuantity, removeItem, clear, itemCount, subtotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (confirmedOrder) {
    return <OrderConfirmation order={confirmedOrder} onDismiss={() => setConfirmedOrder(null)} />;
  }

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const order = await placeOrder({
        items: lines.map((line) => ({ productId: line.product.id, quantity: line.quantity })),
        couponCode: couponCode.trim() || undefined,
      });
      setConfirmedOrder(order);
      clear();
      setCouponCode("");
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Something went wrong placing your order.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <aside className="cart">
      <h2>
        Your cart
        {itemCount > 0 && <span className="cart__count"> ({itemCount})</span>}
      </h2>

      {lines.length === 0 ? (
        <p className="status-message">Your cart is empty — add something from the menu.</p>
      ) : (
        <>
          <ul className="cart__lines">
            {lines.map((line) => (
              <li key={line.product.id} className="cart__line">
                <div className="cart__line-info">
                  <span className="cart__line-name">{line.product.name}</span>
                  <span className="cart__line-price">
                    {formatCurrency(line.product.price * line.quantity)}
                  </span>
                </div>
                <div className="cart__line-controls">
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => setQuantity(line.product.id, line.quantity - 1)}
                    aria-label={`Decrease ${line.product.name} quantity`}
                  >
                    −
                  </button>
                  <span>{line.quantity}</span>
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => setQuantity(line.product.id, line.quantity + 1)}
                    aria-label={`Increase ${line.product.name} quantity`}
                  >
                    +
                  </button>
                  <button type="button" className="secondary" onClick={() => removeItem(line.product.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart__subtotal">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <label className="cart__coupon">
            Coupon code
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="e.g. HAPPYHRS"
              disabled={submitting}
            />
          </label>

          {error && <p className="status-message status-message--error">{error}</p>}

          <button type="button" onClick={handlePlaceOrder} disabled={submitting} className="cart__submit">
            {submitting ? "Placing order…" : "Place order"}
          </button>
        </>
      )}
    </aside>
  );
}
