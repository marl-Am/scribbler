import Head from "next/head";

function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service</title>
      </Head>
      <div className="flex justify-center bg-gray-100">
        <div className="max-w-2xl px-8 py-6">
          <h1 className="mb-6 text-center text-3xl font-bold">Terms of Use</h1>
          <p className="font-bold">Ownership and Property Rights</p>
          <p>
            All items listed on <span className="font-bold">Scribbler</span> are
            used items and are owned by the same entity. The sale is direct from
            the owner to the purchaser.
          </p>

          <p className="mt-4 font-bold">Condition of Items</p>
          <p>
            All items are sold in their current, used condition. Each
            item&apos;s condition may vary, and items are sold{" "}
            <span className="font-bold">&apos;as is&apos;</span>.
          </p>

          <p className="mt-4 font-bold">Pricing and Payment</p>
          <p>
            All prices are set at the sole discretion of the owner. Payments are
            due at the time of purchase and are non-refundable.
          </p>

          <p className="mt-4 font-bold">No Refunds or Exchanges</p>
          <p>
            All sales are final. <span className="font-bold">Scribbler</span>{" "}
            does not offer refunds, exchanges, or returns on any items sold.
          </p>

          <p className="mt-4 font-bold">Acceptance of Terms</p>
          <p>
            By purchasing items from{" "}
            <span className="font-bold">Scribbler</span>, you are agreeing to
            these terms. If you do not agree to these terms, you must not make
            any purchases.
          </p>
        </div>
      </div>
    </>
  );
}

export default Terms;
