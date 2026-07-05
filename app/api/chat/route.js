import dbConnect from "@/lib/mongodb";
import { ChatMessage, OwnerStatus } from "@/lib/models";
import { NextResponse } from "next/server";

// Simple keyword-based smart AI response system
function getAIResponse(userText) {
  const query = userText.toLowerCase().trim();
  
  if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("namaste") || query.includes("pranam") || query.includes("salam")) {
    return "Namaste! Muneem Timber Store AI assistant mein aapka swagat hai. 🙏 Main aapki kya sahayata kar sakta hoon? (Welcome! How can I assist you today?)";
  }
  
  if (query.includes("rate") || query.includes("price") || query.includes("kiraya") || query.includes("bhada") || query.includes("cost") || query.includes("dam")) {
    if (query.includes("balli") || query.includes("bamboo")) {
      return "Balli (Bamboo poles) ka kiraya ₹2 per piece/day (per day) hai. Ye construction shoring ke liye best quality hain.";
    }
    if (query.includes("patra") || query.includes("plank") || query.includes("wood")) {
      return "Patra (Wooden planks) ka kiraya ₹4 per piece/day hai. Strong gatur wood material hai.";
    }
    if (query.includes("chali") || query.includes("plate") || query.includes("loha")) {
      return "Chali (Iron shuttering plates) ka kiraya ₹5 per plate/day hai. Heavy duty rust-free steel plates hain.";
    }
    if (query.includes("teen") || query.includes("sheet") || query.includes("tinchadar")) {
      return "Teen (Corrugated roofing sheets) ka kiraya ₹3 per sheet/day hai.";
    }
    if (query.includes("sidi") || query.includes("ladder")) {
      return "Sidi (Aluminium & wooden ladders) ka kiraya ₹15 per piece/day hai.";
    }
    return "Hamare core rates: Balli (₹2/day), Patra (₹4/day), Chali (₹5/day), Teen (₹3/day), Sidi (₹15/day). Kisi specific tool (jaise Mixer, Drill) ka price jaanna hai to bataiye!";
  }
  
  if (query.includes("balli") || query.includes("bamboo")) {
    return "Muneem Timber Store par solid Bamboo Balli ready stock mein hain. Kiraya ₹2 per piece/day hai. Delivery and transport system available hai.";
  }
  if (query.includes("patra") || query.includes("plank")) {
    return "Patra (Wooden Shuttering Planks) ₹4 per piece/day par rent ke liye available hain.";
  }
  if (query.includes("chali") || query.includes("plate")) {
    return "Shuttering Chali (Loha Plates) ₹5 per piece/day par rental par uplabdh hain.";
  }
  
  if (query.includes("tool") || query.includes("machine") || query.includes("mixer") || query.includes("drill") || query.includes("jcb") || query.includes("cutter") || query.includes("vibrator")) {
    return "Haan ji, hum heavy machinery aur tools bhi rent par dete hain:\n- Concrete Mixer Machine: ₹1200/day\n- Drill Machine / Hammer: ₹150/day\n- Concrete Vibrator: ₹300/day\n- Wood & Marble Cutters: ₹200/day\n- JCB / Mini Excavator and Road Rollers contact details par contact karke book kar sakte hain.";
  }

  if (query.includes("service") || query.includes("mistri") || query.includes("plumber") || query.includes("electrician") || query.includes("labor") || query.includes("manpower")) {
    return "Muneem Timber Store par rental samaan ke sath professional construction services bhi hain:\n- Raj Mistri (Mason)\n- Plumber (Bathroom & pipeline fitting)\n- Electrician (Ghar ki wiring & repair)\n- Emergency Manpower (Labor/helper)\nAap humare 'Services' page par jaakar directly request book kar sakte hain ya hume call karein!";
  }

  if (query.includes("discount") || query.includes("offer") || query.includes("chhoot")) {
    return "Ji bilkul! Reference based Discount offer chal raha hai. Kisi purane known customer ka reference dene par aapko bill par seedhe 10% Discount milega!";
  }

  if (query.includes("location") || query.includes("address") || query.includes("kaha") || query.includes("shop") || query.includes("dukan") || query.includes("path")) {
    return "Hamari dukan (shop) Bilgram Road, near bypass, Hardoi, Uttar Pradesh - 241001 par sthit hai. Google Map location ke liye hamari website ka Location page check karein.";
  }

  if (query.includes("contact") || query.includes("phone") || query.includes("mobile") || query.includes("number") || query.includes("call") || query.includes("whatsapp")) {
    return "Aap hamare owner Faizal ji ko call ya WhatsApp par contact kar sakte hain:\n📞 Phone: +919580716752\n💬 WhatsApp: +919580716752";
  }

  if (query.includes("time") || query.includes("timing") || query.includes("open") || query.includes("close") || query.includes("kab")) {
    return "Muneem Timber Store subah 8:00 AM se shaam 8:00 PM tak hafte ke 7 din khula rehta hai.";
  }

  if (query.includes("owner") || query.includes("faizal") || query.includes("anees") || query.includes("founder")) {
    return "Muneem Timber Store ki sthapna Late Mr. Anees Mansoori ji ne 1995 mein ki thi. Abhi isse Ali aur Faizal ji chalate hain. Unka bharosa hi hamari pehchan hai.";
  }
  
  if (query.includes("payment") || query.includes("advance") || query.includes("upi") || query.includes("cash") || query.includes("credit")) {
    return "Hum Cash, UPI, and Bank transfer accept karte hain. Shuruat mein standard half-advance (minimum 5 din ka rent) pay karna hota hai. Premium / trusted customers ke liye credit (udhaar) system bhi available hai.";
  }

  return "Aapka sandesh mil gaya hai! 🙏 Main ek AI assistant hoon. Agar aap pricing, dukan ka pata, timing, ya orders ke baare mein kuch aur poochna chahte hain to batayein, ya fir humare store owner jald hi aapse live chat par sampark karenge.";
}

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    
    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }
    
    const messages = await ChatMessage.find({ sessionId }).sort({ timestamp: 1 });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Chat GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const { sessionId, sender, text, visitorName } = await request.json();
    
    if (!sessionId || !sender || !text) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // Save user message
    const msg = new ChatMessage({
      sessionId,
      sender,
      text,
      visitorName: visitorName || "Guest",
      timestamp: new Date()
    });
    await msg.save();
    
    // If message is from visitor, check if owner is online.
    if (sender === "visitor") {
      const ownerStatus = await OwnerStatus.findOne({});
      const isOwnerOnline = ownerStatus && (Date.now() - new Date(ownerStatus.lastActive).getTime() < 15000); // 15 seconds
      
      if (!isOwnerOnline) {
        // Owner is offline. Trigger AI response after a short delay (or immediately in API)
        const aiText = getAIResponse(text);
        const aiMsg = new ChatMessage({
          sessionId,
          sender: "ai",
          text: aiText,
          visitorName: "Muneem AI Helper",
          timestamp: new Date()
        });
        await aiMsg.save();
      }
    }
    
    return NextResponse.json({ success: true, message: msg });
  } catch (error) {
    console.error("Chat POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
