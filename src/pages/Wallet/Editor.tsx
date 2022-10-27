
import Monaco from '@monaco-editor/react';

export default function Editor({ value, onChange }: { value: string, onChange: (value: string | undefined) => void }) {


    return <div style={{ border: "1px solid #dddddc" }}>
        <Monaco
            language="json"
            width={500}
            height={400}
            value={value}
            options={{
                minimap: { enabled: false }
            }}
            onChange={onChange}
        />
    </div>
};