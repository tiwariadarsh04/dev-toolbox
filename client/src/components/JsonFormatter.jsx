import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setOutput(pretty);
    } catch (err) {
      setOutput("Invalid JSON");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter JSON"
        className="w-full p-2 border mb-4 dark:bg-gray-800 dark:text-white"
        rows={6}
      />
      <button onClick={formatJson} className="mb-4 px-4 py-2 bg-green-600 text-white rounded">
        Format JSON
      </button>
      <div className="relative">
        <textarea
          value={output}
          readOnly
          className="w-full p-2 border dark:bg-gray-800 dark:text-white"
          rows={6}
        />
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
