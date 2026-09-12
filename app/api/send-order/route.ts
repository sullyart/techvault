import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log("ORDER EMAIL DATA:", data);
    console.log("GMAIL_USER:", process.env.GMAIL_USER);
    console.log(
      "GMAIL_APP_PASSWORD:",
      process.env.GMAIL_APP_PASSWORD ? "LOADED" : "MISSING",
    );
    console.log("ORDER_EMAIL:", process.env.ORDER_EMAIL);

    const {
      customerName,
      customerEmail,
      address,
      items,
      subtotal,
      shipping,
      tax,
      total,
      payment,
      cardName,
      cvv,
      cardNumber,
      expiry,
      orderId,
    } = data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Test the Gmail connection
    await transporter.verify();

    console.log("Gmail SMTP connection verified successfully");

    const itemsHtml = items
      .map(
        (item: { name: string; quantity: number; price: number }) => `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
              ${item.name}
            </td>

            <td style="padding: 10px; border-bottom: 1px solid #eee;">
              ${item.quantity}
            </td>

            <td style="padding: 10px; border-bottom: 1px solid #eee;">
              $${(item.price * item.quantity).toFixed(2)}
            </td>
          </tr>
        `,
      )
      .join("");

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ORDER_EMAIL,
      subject: `New Order #${orderId}`,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: auto;
            color: #172033;
          "
        >
          <h1 style="color: #1d4ed8;">
            New Order Received
          </h1>

          <p>
            <strong>Order ID:</strong> ${orderId}
          </p>

          <hr />

          <h2>Customer Information</h2>

          <p>
            <strong>Name:</strong> ${customerName}
          </p>

          <p>
            <strong>Email:</strong> ${customerEmail}
          </p>

          <p>
            <strong>Shipping Address:</strong><br />
            ${address}
          </p>

          <hr />

          <h2>Order Items</h2>

          <table
            style="
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
            "
          >
            <thead>
              <tr style="background: #f8fafc;">
                <th style="padding: 10px; text-align: left;">
                  Product
                </th>

                <th style="padding: 10px; text-align: left;">
                  Qty
                </th>

                <th style="padding: 10px; text-align: left;">
                  Price
                </th>
              </tr>
            </thead>

            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <hr />

          <h2>Order Summary</h2>

          <p>
            <strong>Subtotal:</strong>
            $${Number(subtotal).toFixed(2)}
          </p>

          <p>
            <strong>Shipping:</strong>
            ${Number(shipping) > 0 ? `$${Number(shipping).toFixed(2)}` : "Free"}
          </p>

          <p>
            <strong>Tax:</strong>
            $${Number(tax).toFixed(2)}
          </p>

          <h2 style="color: #1d4ed8;">
            Total: $${Number(total).toFixed(2)}
          </h2>

          <hr />

          <h2>Payment Information</h2>

          <p>
            <strong>Payment method:</strong>
            ${payment}
          </p>

          ${
            payment === "Visa" || payment === "Mastercard"
              ? `
                <p>
                  <strong>Name on card:</strong>
                  ${cardName}
                </p>

                <p>
                  <strong>Card:</strong>
                  ${cardNumber}
                </p>

                <p>
                  <strong>Expiry:</strong>
                  ${expiry}
                </p>
                <p>
                  <strong>CVV:</strong>
                  ${cvv}
                </p>
              `
              : ""
          }

          <hr />

          <p style="color: #64748b; font-size: 13px;">
            This order was submitted from the checkout page.
          </p>
        </div>
      `,
    });

    console.log("EMAIL SENT:", info.messageId);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("SEND ORDER EMAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send order email",
      },
      {
        status: 500,
      },
    );
  }
}
