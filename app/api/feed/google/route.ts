import { NextResponse } from "next/server";
import { PRODUCTS_DATA } from "@/lib/data/mockData";

export async function GET() {
  const baseUrl = "https://phabulousbymitthat.com";

  const xmlItems = PRODUCTS_DATA.map((p) => {
    const v = p.variants[0];
    const priceFormatted = `${(v.price / 100).toFixed(2)} INR`;

    return `
    <item>
      <g:id>${p.id}</g:id>
      <g:title><![CDATA[${p.title}]]></g:title>
      <g:description><![CDATA[${p.description}]]></g:description>
      <g:link>${baseUrl}/products/${p.slug}</g:link>
      <g:image_link>${baseUrl}${p.images[0]}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${v.stock > 0 ? "in_stock" : "out_of_stock"}</g:availability>
      <g:price>${priceFormatted}</g:price>
      <g:brand>Phabulous by Mitthat</g:brand>
      <g:google_product_category>188</g:google_product_category>
      <g:material><![CDATA[${p.materialFinish}]]></g:material>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Phabulous by Mitthat Product Feed</title>
    <link>${baseUrl}</link>
    <description>Handpicked jewellery, simply irresistible.</description>
    ${xmlItems}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
