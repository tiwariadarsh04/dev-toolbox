import { useState } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleEncode = async () => {
    const res = await fetch("http://localhost:5000/encode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });
    const data = await res.json();
    setOutput(data.encoded);
  };

  const handleDecode = async () => {
    const res = await fetch("http://localhost:5000/decode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64: input }),
    });
    const data = await res.json();
    setOutput(data.decoded || "❌ Invalid Base64");
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <textarea
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border mb-4 dark:bg-gray-800 dark:text-white"
        placeholder="Enter text or base64..."
      />
      <div className="flex gap-2 mb-4">
        <button onClick={handleEncode} className="bg-blue-500 text-white px-4 py-2 rounded">
          Encode
        </button>
        <button onClick={handleDecode} className="bg-purple-500 text-white px-4 py-2 rounded">
          Decode
        </button>
      </div>

      {output && (
        <div className="relative">
          <pre className="bg-gray-200 dark:bg-gray-800 dark:text-white p-4 rounded whitespace-pre-wrap">
            {output}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
