import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const secret = process.env.SANITY_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const signature = req.headers.get(SIGNATURE_HEADER_NAME);
    const body = await req.text(); // Read raw text for signature validation

    if (!signature || !isValidSignature(body, signature, secret)) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 },
      );
    }

    const jsonBody = JSON.parse(body);
    const _type = jsonBody?._type;

    if (!_type) {
      return NextResponse.json(
        { message: "Bad request: Missing _type" },
        { status: 400 },
      );
    }

    revalidateTag(_type, "max");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
