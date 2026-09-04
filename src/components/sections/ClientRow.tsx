interface ClientRowProps {
  clients: string[];
  center?: boolean;
}

export function ClientRow({ clients, center = false }: ClientRowProps) {
  return (
    <div className={`flex flex-wrap gap-3.5 mt-2 ${center ? "justify-center" : ""}`}>
      {clients.map((client) => (
        <span
          key={client}
          className="border border-hairline bg-bg-panel px-[18px] py-2.5 text-[0.85rem] font-semibold text-charcoal tracking-[0.01em] rounded"
        >
          {client}
        </span>
      ))}
    </div>
  );
}
