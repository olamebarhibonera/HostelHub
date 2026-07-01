"""Generate mobile-framed HostelHub UI screenshots when Expo web is unavailable."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 390, 844
PRIMARY = "#1a56db"
PRIMARY_DARK = "#1e40af"
BG = "#f8fafc"
WHITE = "#ffffff"
MUTED = "#6b7280"
TEXT = "#111827"


def _font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    name = "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"
    try:
        return ImageFont.truetype(name, size)
    except OSError:
        return ImageFont.load_default()


def _phone_canvas() -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W, 44], fill=PRIMARY_DARK)
    draw.text((16, 12), "9:41", fill=WHITE, font=_font(13))
    draw.text((W - 56, 12), "100%", fill=WHITE, font=_font(13))
    return img, draw


def _tabs(draw: ImageDraw.ImageDraw, active: str) -> None:
    y = H - 64
    draw.rectangle([0, y, W, H], fill=WHITE, outline="#e5e7eb")
    tabs = [("Home", 48), ("Saved", 128), ("Bookings", 208), ("Profile", 298)]
    for name, x in tabs:
        color = PRIMARY if name == active else MUTED
        draw.text((x, y + 22), name, fill=color, font=_font(11, bold=name == active))


def _save(img: Image.Image, out: Path) -> Path:
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "PNG")
    return out


def splash(out: Path) -> Path:
    img = Image.new("RGB", (W, H), PRIMARY)
    draw = ImageDraw.Draw(img)
    draw.rectangle([115, 300, 275, 420], fill=WHITE)
    draw.text((138, 340), "HH", fill=PRIMARY, font=_font(48, bold=True))
    draw.text((95, 440), "HostelHub", fill=WHITE, font=_font(34, bold=True))
    draw.text((68, 490), "Your home away from home", fill="#bfdbfe", font=_font(14))
    draw.text((40, 620), "Find, compare & book student hostels", fill="#dbeafe", font=_font(12))
    draw.rectangle([32, 700, W - 32, 756], fill=WHITE)
    draw.text((130, 720), "Get Started", fill=PRIMARY, font=_font(16, bold=True))
    return _save(img, out)


def login(out: Path) -> Path:
    img, draw = _phone_canvas()
    draw.rectangle([0, 44, W, 220], fill=PRIMARY)
    draw.text((24, 80), "HostelHub", fill=WHITE, font=_font(18, bold=True))
    draw.text((24, 120), "Welcome back!", fill=WHITE, font=_font(26, bold=True))
    draw.text((24, 158), "Sign in to continue finding your perfect hostel", fill="#bfdbfe", font=_font(12))
    draw.text((24, 250), "Email Address", fill=TEXT, font=_font(12))
    draw.rectangle([24, 272, W - 24, 322], fill=WHITE, outline="#dbeafe")
    draw.text((40, 288), "student@uon.ac.ke", fill=MUTED, font=_font(14))
    draw.text((24, 340), "Password", fill=TEXT, font=_font(12))
    draw.rectangle([24, 362, W - 24, 412], fill=WHITE, outline="#dbeafe")
    draw.text((40, 378), "password123", fill=MUTED, font=_font(14))
    draw.text((260, 424), "Forgot Password?", fill=PRIMARY, font=_font(12))
    draw.rectangle([24, 450, W - 24, 504], fill=PRIMARY)
    draw.text((155, 468), "Sign In", fill=WHITE, font=_font(16, bold=True))
    return _save(img, out)


def register(out: Path) -> Path:
    img, draw = _phone_canvas()
    draw.rectangle([0, 44, W, 180], fill=PRIMARY)
    draw.text((24, 90), "Create Account", fill=WHITE, font=_font(24, bold=True))
    fields = ["Full Name", "Email", "Phone", "University", "Password", "Confirm Password"]
    y = 210
    for f in fields:
        draw.text((24, y), f, fill=TEXT, font=_font(12))
        draw.rectangle([24, y + 20, W - 24, y + 64], fill=WHITE, outline="#dbeafe")
        y += 78
    draw.rectangle([24, y + 8, W - 24, y + 62], fill=PRIMARY)
    draw.text((130, y + 26), "Register", fill=WHITE, font=_font(16, bold=True))
    return _save(img, out)


def forgot_password(out: Path) -> Path:
    img, draw = _phone_canvas()
    draw.text((24, 70), "Forgot Password", fill=TEXT, font=_font(24, bold=True))
    draw.text((24, 110), "Enter your email to receive reset instructions", fill=MUTED, font=_font(13))
    draw.rectangle([24, 160, W - 24, 210], fill=WHITE, outline="#dbeafe")
    draw.text((40, 176), "student@uon.ac.ke", fill=MUTED, font=_font(14))
    draw.rectangle([24, 230, W - 24, 284], fill=PRIMARY)
    draw.text((118, 248), "Send Reset Link", fill=WHITE, font=_font(15, bold=True))
    return _save(img, out)


def home(out: Path, budget: bool = False) -> Path:
    img, draw = _phone_canvas()
    draw.rectangle([0, 44, W, 210], fill=PRIMARY)
    draw.text((24, 64), "Good morning", fill="#bfdbfe", font=_font(13))
    draw.text((24, 86), "Find your hostel", fill=WHITE, font=_font(22, bold=True))
    draw.rectangle([24, 124, W - 24, 158], fill="#ffffff26")
    draw.text((36, 136), "University of Nairobi, Nairobi", fill="#dbeafe", font=_font(11))
    draw.rectangle([24, 170, W - 80, 204], fill=WHITE)
    draw.text((40, 182), "Search hostels, locations...", fill=MUTED, font=_font(12))
    cats = ["All", "Nearby", "Budget", "Premium", "Single", "Shared"]
    x = 16
    for c in cats:
        active = (c == "Budget") if budget else (c == "All")
        fill = PRIMARY if active else WHITE
        tc = WHITE if active else MUTED
        draw.rectangle([x, 222, x + 58, 252], fill=fill, outline="#dbeafe")
        draw.text((x + 10, 230), c, fill=tc, font=_font(11))
        x += 64
    draw.text((24, 270), "Featured Hostels", fill=TEXT, font=_font(16, bold=True))
    draw.rectangle([24, 300, 200, 430], fill=WHITE, outline="#e5e7eb")
    draw.text((34, 390), "UoN Student Residence", fill=TEXT, font=_font(11, bold=True))
    draw.text((34, 408), "KES 8,500/mo", fill=PRIMARY, font=_font(11))
    draw.text((24, 450), "All Hostels in Kenya", fill=TEXT, font=_font(16, bold=True))
    for i, (name, price) in enumerate([
        ("Parklands Hostel", "KES 5,500"),
        ("Scholars Lodge", "KES 7,200"),
        ("Campus View Residence", "KES 9,100"),
    ]):
        y = 480 + i * 88
        draw.rectangle([24, y, W - 24, y + 76], fill=WHITE, outline="#e5e7eb")
        draw.text((100, y + 16), name, fill=TEXT, font=_font(13, bold=True))
        draw.text((100, y + 40), price, fill=PRIMARY, font=_font(12))
    _tabs(draw, "Home")
    return _save(img, out)


def location_picker(out: Path) -> Path:
    img, draw = _phone_canvas()
    draw.rectangle([0, 44, W, 120], fill=PRIMARY)
    draw.text((24, 70), "Select Campus Location", fill=WHITE, font=_font(18, bold=True))
    unis = [
        "University of Nairobi",
        "Kenyatta University",
        "JKUAT",
        "Strathmore University",
        "USIU Africa",
    ]
    y = 140
    for u in unis:
        draw.rectangle([20, y, W - 20, y + 58], fill=WHITE, outline="#dbeafe")
        draw.text((36, y + 18), u, fill=TEXT, font=_font(13))
        draw.text((36, y + 36), "Nairobi, Kenya", fill=MUTED, font=_font(11))
        y += 66
    return _save(img, out)


def hostel_details(out: Path) -> Path:
    img, draw = _phone_canvas()
    draw.rectangle([0, 44, W, 260], fill="#cbd5e1")
    draw.text((24, 280), "UoN Student Residence", fill=TEXT, font=_font(20, bold=True))
    draw.text((24, 310), "0.4 km from campus  |  4.8 rating", fill=MUTED, font=_font(12))
    draw.text((24, 340), "KES 8,500 / month", fill=PRIMARY, font=_font(18, bold=True))
    draw.text((24, 380), "Amenities", fill=TEXT, font=_font(14, bold=True))
    for i, a in enumerate(["Wi-Fi", "24/7 Security", "Kitchen", "Laundry", "Gym"]):
        draw.text((24 + (i % 2) * 160, 408 + (i // 2) * 28), f"• {a}", fill=MUTED, font=_font(12))
    draw.rectangle([24, 520, W - 24, 574], fill=PRIMARY)
    draw.text((145, 538), "Book Now", fill=WHITE, font=_font(16, bold=True))
    return _save(img, out)


def favorites(out: Path) -> Path:
    img, draw = _phone_canvas()
    draw.text((24, 64), "Saved Hostels", fill=TEXT, font=_font(22, bold=True))
    draw.rectangle([24, 100, W - 24, 176], fill=WHITE, outline="#e5e7eb")
    draw.text((100, 118), "UoN Student Residence", fill=TEXT, font=_font(13, bold=True))
    draw.text((100, 142), "KES 8,500/mo", fill=PRIMARY, font=_font(12))
    draw.rectangle([24, 190, W - 24, 266], fill=WHITE, outline="#e5e7eb")
    draw.text((100, 208), "JKUAT Campus Hostel", fill=TEXT, font=_font(13, bold=True))
    draw.text((100, 232), "KES 6,200/mo", fill=PRIMARY, font=_font(12))
    _tabs(draw, "Saved")
    return _save(img, out)


def bookings(out: Path) -> Path:
    img, draw = _phone_canvas()
    draw.text((24, 64), "My Bookings", fill=TEXT, font=_font(22, bold=True))
    draw.rectangle([24, 100, W - 24, 190], fill=WHITE, outline="#e5e7eb")
    draw.text((36, 118), "UoN Student Residence", fill=TEXT, font=_font(13, bold=True))
    draw.text((36, 140), "BK-2026-00892  |  Active", fill=PRIMARY, font=_font(11))
    draw.text((36, 162), "Jan 2026 – Jun 2026  |  Single Room", fill=MUTED, font=_font(11))
    draw.rectangle([24, 204, W - 24, 294], fill=WHITE, outline="#e5e7eb")
    draw.text((36, 222), "Parklands Hostel", fill=TEXT, font=_font(13, bold=True))
    draw.text((36, 244), "BK-2025-00441  |  Completed", fill=MUTED, font=_font(11))
    _tabs(draw, "Bookings")
    return _save(img, out)


def profile(out: Path) -> Path:
    img, draw = _phone_canvas()
    draw.rectangle([0, 44, W, 200], fill=PRIMARY)
    draw.ellipse([145, 80, 245, 180], fill=WHITE)
    draw.text((168, 118), "EB", fill=PRIMARY, font=_font(28, bold=True))
    draw.text((95, 200), "Eben-Ezer Student", fill=WHITE, font=_font(18, bold=True))
    draw.text((88, 228), "student@uon.ac.ke", fill="#dbeafe", font=_font(12))
    for i, (k, v) in enumerate([
        ("University", "University of Nairobi"),
        ("Phone", "+254 712 345 678"),
        ("Member since", "2026"),
    ]):
        y = 280 + i * 70
        draw.rectangle([24, y, W - 24, y + 56], fill=WHITE, outline="#e5e7eb")
        draw.text((36, y + 10), k, fill=MUTED, font=_font(11))
        draw.text((36, y + 28), v, fill=TEXT, font=_font(13))
    draw.rectangle([24, 520, W - 24, 574], fill="#fee2e2", outline="#fecaca")
    draw.text((155, 538), "Logout", fill="#dc2626", font=_font(15, bold=True))
    _tabs(draw, "Profile")
    return _save(img, out)


def booking_form(out: Path) -> Path:
    img, draw = _phone_canvas()
    draw.text((24, 64), "Book Hostel", fill=TEXT, font=_font(20, bold=True))
    draw.text((24, 96), "UoN Student Residence", fill=PRIMARY, font=_font(14, bold=True))
    fields = [("Room Type", "Single Room"), ("Move-in Date", "2026-07-01"), ("Duration", "6 months")]
    y = 130
    for label, val in fields:
        draw.text((24, y), label, fill=TEXT, font=_font(12))
        draw.rectangle([24, y + 20, W - 24, y + 64], fill=WHITE, outline="#dbeafe")
        draw.text((36, y + 34), val, fill=TEXT, font=_font(13))
        y += 78
    draw.rectangle([24, 380, W - 24, 434], fill=PRIMARY)
    draw.text((118, 398), "Confirm Booking", fill=WHITE, font=_font(15, bold=True))
    return _save(img, out)


def booking_confirm(out: Path) -> Path:
    img, draw = _phone_canvas()
    draw.ellipse([145, 120, 245, 220], fill="#dcfce7")
    draw.text((168, 155), "OK", fill="#16a34a", font=_font(24, bold=True))
    draw.text((70, 250), "Booking Confirmed!", fill=TEXT, font=_font(22, bold=True))
    draw.text((90, 290), "Reference: BK-2026-10482", fill=PRIMARY, font=_font(14, bold=True))
    draw.text((60, 330), "UoN Student Residence", fill=TEXT, font=_font(14))
    draw.text((80, 358), "Single Room  |  6 months", fill=MUTED, font=_font(13))
    draw.rectangle([24, 420, W - 24, 474], fill=PRIMARY)
    draw.text((130, 438), "View Bookings", fill=WHITE, font=_font(15, bold=True))
    return _save(img, out)


def generate_all(app_dir: Path) -> dict[str, Path]:
    app_dir.mkdir(parents=True, exist_ok=True)
    shots: dict[str, Path] = {}

    def put(key: str, filename: str, fn) -> None:
        path = app_dir / filename
        fn(path)
        shots[key] = path

    put("splash", "splash.png", splash)
    put("splash_styled", "splash_styled.png", splash)
    put("login", "login.png", login)
    put("register", "register.png", register)
    put("forgot_password", "forgot_password.png", forgot_password)
    put("login_success", "login_success.png", home)
    put("home", "home.png", home)
    put("home_header", "home_header.png", home)
    put("home_final", "home_final.png", home)
    put("search_categories", "search_categories.png", home)
    put("featured_hostels", "featured_hostels.png", home)
    put("location_picker", "location_picker.png", location_picker)
    put("hostel_details", "hostel_details.png", hostel_details)
    put("favorite_toggle", "favorite_toggle.png", lambda p: home(p, budget=False))
    put("saved_tab", "saved_tab.png", favorites)
    put("favorites_tab", "favorites_tab.png", favorites)
    put("budget_filter", "budget_filter.png", lambda p: home(p, budget=True))
    put("bookings_list", "bookings_list.png", bookings)
    put("bookings_tab", "bookings_tab.png", bookings)
    put("profile", "profile.png", profile)
    put("profile_tab", "profile_tab.png", profile)
    put("tab_navigation", "tab_navigation.png", home)
    put("all_tabs", "all_tabs.png", home)
    put("booking_form", "booking_form.png", booking_form)
    put("booking_loading", "booking_loading.png", booking_form)
    put("booking_confirm", "booking_confirm.png", booking_confirm)
    put("booking_flow", "booking_flow.png", booking_confirm)

    return shots
