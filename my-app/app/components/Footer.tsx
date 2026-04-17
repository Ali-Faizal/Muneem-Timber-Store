export default function Footer() {
  return (
    <footer className="bg-[rgb(13,27,42)] text-white px-4 md:px-10 py-10">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* 1️⃣ ABOUT */}
        <div>
          <h2 className="text-lg md:text-xl font-bold">
            Muneem Timber Store
          </h2>

          <p className="text-sm text-gray-300 mt-2">
            Hardoi ka sabse bharosemand timber kiraya aur construction service center. 2010 se sewa mein.
          </p>
        </div>

        {/* 2️⃣ KIRAYA ITEMS */}
        <div>
          <h3 className="font-semibold mb-2">Kiraya Items</h3>

          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="#">Balli</a></li>
            <li><a href="#">Patra</a></li>
            <li><a href="#">Chali</a></li>
            <li><a href="#">Teen</a></li>
            <li><a href="#">Bans</a></li>
          </ul>
        </div>

        {/* 3️⃣ SERVICES */}
        <div>
          <h3 className="font-semibold mb-2">Services</h3>

          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="#">Ghar Construction</a></li>
            <li><a href="#">Mistri</a></li>
            <li><a href="#">Plumber</a></li>
            <li><a href="#">Electrician</a></li>
          </ul>
        </div>

        {/* 4️⃣ CONTACT */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>

          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="tel:9580716752">+91 9580716752</a></li>
            <li><a href="#">WhatsApp</a></li>
            <li><a href="#">Location</a></li>
          </ul>
        </div>

      </div>

      {/* LINE */}
      <div className="border-t border-gray-600 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center gap-2">

        {/* LEFT */}
        <p className="text-sm text-gray-400">
          © 2026 Muneem Timber Store, Hardoi UP
        </p>

        {/* RIGHT */}
        <p className="text-sm text-gray-400 flex items-center gap-1">
          Banaya gaya with ❤️ aapke bhai Faizal Munna
        </p>

      </div>

    </footer>
  );
}