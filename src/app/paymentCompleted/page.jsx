export default function PaymentCompleted() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        paddingTop: "100px",
        backgroundColor: "#8F5D46",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <div style={{ fontSize: "64px", color: "#FFFFFF" }}>✔️</div>
      <h1>Payment Already Completed</h1>
      <p>
        Your invoice has already been paid successfully. No further action is
        needed.
      </p>
    </div>
  );
}
