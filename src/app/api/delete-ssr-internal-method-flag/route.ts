import { NextResponse } from "next/server";
import { deleteHasSsrInternalMethodExecutedFlag } from "../../(us)/us/(search)/lib/redis";

export async function POST() {
    try {
        await deleteHasSsrInternalMethodExecutedFlag();
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Error while deleting the flag:", error);
        return NextResponse.json(
            { ok: false, error: "Failed to delete the flag" },
            { status: 500 }
        );
    }
}

