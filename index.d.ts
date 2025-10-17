interface PrintConfig {
    environment: 'development' | 'production';
    timestamps: boolean;
}
declare let config: PrintConfig;
declare const timers: Map<string, number>;
declare function print(data: any): void;
declare namespace print {
    var configure: (options: Partial<PrintConfig>) => typeof print;
    var log: (data: any) => void;
    var success: (data: any) => void;
    var error: (data: any) => void;
    var info: (data: any) => void;
    var warn: (data: any) => void;
    var debug: (data: any) => void;
    var table: (data: any) => void;
    var count: (label: string) => void;
    var countReset: (label: string) => void;
    var dir: (data: any) => void;
    var dirxml: (data: any) => void;
    var startTimer: (label: string) => void;
    var endTimer: (label: string) => void;
    var performance: (data: any) => void;
}
declare function formatData(data: any): string;
//# sourceMappingURL=index.d.ts.map