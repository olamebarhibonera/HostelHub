# HostelHub Logbook Screenshot Generator
# Renders app screens as PNG images using System.Drawing (no npm required)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$Root = Split-Path -Parent $PSScriptRoot
$OutApp = Join-Path $Root "screenshots"
$OutEvidence = Join-Path $OutApp "evidence"
New-Item -ItemType Directory -Force -Path $OutApp, $OutEvidence | Out-Null

$W = 390
$H = 844

function New-Color([string]$Hex) {
    $Hex = $Hex.TrimStart('#')
    return [System.Drawing.Color]::FromArgb(
        [Convert]::ToInt32($Hex.Substring(0,2), 16),
        [Convert]::ToInt32($Hex.Substring(2,2), 16),
        [Convert]::ToInt32($Hex.Substring(4,2), 16)
    )
}

$Primary   = New-Color "1a56db"
$PrimaryDk = New-Color "1e40af"
$Bg        = New-Color "f5f7fb"
$White     = [System.Drawing.Color]::White
$Muted     = New-Color "5a6a8a"
$Gray      = New-Color "9ca3af"
$Dark      = New-Color "0d1b3e"
$BlueLight = New-Color "bfdbfe"
$Green     = New-Color "16a34a"

$FontTitle = New-Object System.Drawing.Font("Segoe UI Semibold", 22)
$FontH1    = New-Object System.Drawing.Font("Segoe UI Semibold", 18)
$FontH2    = New-Object System.Drawing.Font("Segoe UI Semibold", 15)
$FontBody  = New-Object System.Drawing.Font("Segoe UI", 11)
$FontSmall = New-Object System.Drawing.Font("Segoe UI", 9)
$FontBtn   = New-Object System.Drawing.Font("Segoe UI Semibold", 12)
$FontLogo  = New-Object System.Drawing.Font("Segoe UI", 28, [System.Drawing.FontStyle]::Bold)

function Save-Bitmap($bmp, $name) {
    $path = Join-Path $OutApp $name
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Saved $name"
}

function Draw-Text($g, $text, $font, $brush, $x, $y, $maxW = 0) {
    if ($maxW -gt 0) {
        $rect = New-Object System.Drawing.RectangleF($x, $y, $maxW, 200)
        $g.DrawString($text, $font, $brush, $rect)
    } else {
        $g.DrawString($text, $font, $brush, $x, $y)
    }
}

function Draw-RoundedRect($g, $brush, $x, $y, $w, $h, $r) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc($x, $y, $r*2, $r*2, 180, 90)
    $path.AddArc($x+$w-$r*2, $y, $r*2, $r*2, 270, 90)
    $path.AddArc($x+$w-$r*2, $y+$h-$r*2, $r*2, $r*2, 0, 90)
    $path.AddArc($x, $y+$h-$r*2, $r*2, $r*2, 90, 90)
    $path.CloseFigure()
    $g.FillPath($brush, $path)
    $path.Dispose()
}

function Draw-GradientHeader($g, $h) {
    $rect = New-Object System.Drawing.Rectangle(0, 0, $W, $h)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $rect, $Primary, $PrimaryDk, 45
    )
    $g.FillRectangle($brush, $rect)
    $brush.Dispose()
}

function Draw-TabBar($g) {
    $y = $H - 70
    $g.FillRectangle((New-Object System.Drawing.SolidBrush $White), 0, $y, $W, 70)
    $pen = New-Object System.Drawing.Pen (New-Color "eff6ff")
    $g.DrawLine($pen, 0, $y, $W, $y)
    $tabs = @("Home", "Saved", "Bookings", "Profile")
    $active = 0
    for ($i=0; $i -lt 4; $i++) {
        $tx = 20 + $i * 92
        $c = if ($i -eq $active) { $Primary } else { $Gray }
        Draw-Text $g $tabs[$i] $FontSmall (New-Object System.Drawing.SolidBrush $c) $tx ($y+42)
        $g.FillEllipse((New-Object System.Drawing.SolidBrush $c), $tx+18, $y+14, 10, 10)
    }
}

function Draw-HostelCard($g, $x, $y, $name, $loc, $price, $rating, $compact=$true) {
    $brush = New-Object System.Drawing.SolidBrush $White
    Draw-RoundedRect $g $brush $x $y 350 90 16
    $imgBrush = New-Object System.Drawing.SolidBrush (New-Color "dbeafe")
    Draw-RoundedRect $g $imgBrush ($x+10) ($y+10) 70 70 12
    Draw-Text $g $name $FontH2 (New-Object System.Drawing.SolidBrush $Dark) ($x+90) ($y+12) 240
    Draw-Text $g $loc $FontSmall (New-Object System.Drawing.SolidBrush $Muted) ($x+90) ($y+36) 240
    Draw-Text $g "* $rating" $FontSmall (New-Object System.Drawing.SolidBrush $Dark) ($x+90) ($y+58)
    Draw-Text $g "KSh $price/mo" $FontH2 (New-Object System.Drawing.SolidBrush $Primary) ($x+250) ($y+58)
}

function Draw-InputField($g, $x, $y, $label, $value, $placeholder) {
    Draw-Text $g $label $FontBody (New-Object System.Drawing.SolidBrush $Dark) $x $y
    $brush = New-Object System.Drawing.SolidBrush $White
    Draw-RoundedRect $g $brush $x ($y+22) 338 48 16
    $pen = New-Object System.Drawing.Pen (New-Color "dbeafe")
    $g.DrawRectangle($pen, $x, $y+22, 338, 48)
    $text = if ($value) { $value } else { $placeholder }
    $c = if ($value) { $Dark } else { $Gray }
    Draw-Text $g $text $FontBody (New-Object System.Drawing.SolidBrush $c) ($x+14) ($y+36)
}

# 1. Splash
& {
    $bmp = New-Object System.Drawing.Bitmap $W, $H
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = "AntiAlias"
    $g.TextRenderingHint = "ClearTypeGridFit"
    Draw-GradientHeader $g $H
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $White) 133 280 124 124 28
    Draw-Text $g "HH" $FontLogo (New-Object System.Drawing.SolidBrush $Primary) 175 320
    Draw-Text $g "HostelHub" (New-Object System.Drawing.Font("Segoe UI", 34, [System.Drawing.FontStyle]::Bold)) (New-Object System.Drawing.SolidBrush $White) 70 430
    Draw-Text $g "Your home away from home" $FontBody (New-Object System.Drawing.SolidBrush $BlueLight) 95 480
    Draw-Text $g "Find, compare and book student hostels near your campus" $FontBody (New-Object System.Drawing.SolidBrush $BlueLight) 55 640
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $White) 24 720 342 52 16
    Draw-Text $g "Get Started" $FontBtn (New-Object System.Drawing.SolidBrush $Primary) 145 736
    Save-Bitmap $bmp "01-splash.png"
}

# 2. Login
& {
    $bmp = New-Object System.Drawing.Bitmap $W, $H
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = "AntiAlias"
    $g.FillRectangle((New-Object System.Drawing.SolidBrush $Bg), 0, 0, $W, $H)
    Draw-GradientHeader $g 200
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $White) 24 50 40 40 10
    Draw-Text $g "HostelHub" $FontH1 (New-Object System.Drawing.SolidBrush $White) 74 58
    Draw-Text $g "Welcome back!" (New-Object System.Drawing.Font("Segoe UI Semibold", 24)) (New-Object System.Drawing.SolidBrush $White) 24 110
    Draw-Text $g "Sign in to continue finding your perfect hostel" $FontBody (New-Object System.Drawing.SolidBrush $BlueLight) 24 148
    Draw-InputField $g 24 220 "Email Address" "student@uon.ac.ke" "you@university.edu"
    Draw-InputField $g 24 310 "Password" "********" "********"
    Draw-Text $g "Forgot Password?" $FontBody (New-Object System.Drawing.SolidBrush $Primary) 230 380
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $Primary) 24 410 342 52 16
    Draw-Text $g "Sign In" $FontBtn (New-Object System.Drawing.SolidBrush $White) 165 426
    Draw-Text $g "Don't have an account? Register" $FontBody (New-Object System.Drawing.SolidBrush $Muted) 90 500
    Save-Bitmap $bmp "02-login.png"
}

# 3. Register
& {
    $bmp = New-Object System.Drawing.Bitmap $W, $H
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = "AntiAlias"
    $g.FillRectangle((New-Object System.Drawing.SolidBrush $Bg), 0, 0, $W, $H)
    Draw-GradientHeader $g 160
    Draw-Text $g "Create Account" (New-Object System.Drawing.Font("Segoe UI Semibold", 22)) (New-Object System.Drawing.SolidBrush $White) 24 60
    Draw-InputField $g 24 180 "First Name" "Eben-Ezer" ""
    Draw-InputField $g 24 270 "Last Name" "Olame" ""
    Draw-InputField $g 24 360 "Email Address" "eben@students.ac.ke" ""
    Draw-InputField $g 24 450 "University" "University of Nairobi" ""
    Draw-InputField $g 24 540 "Password" "********" ""
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $Primary) 24 610 342 52 16
    Draw-Text $g "Create Account" $FontBtn (New-Object System.Drawing.SolidBrush $White) 120 626
    Save-Bitmap $bmp "03-register.png"
}

# 4. Home
& {
    $bmp = New-Object System.Drawing.Bitmap $W, $H
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = "AntiAlias"
    $g.FillRectangle((New-Object System.Drawing.SolidBrush $Bg), 0, 0, $W, $H)
    Draw-GradientHeader $g 210
    Draw-Text $g "Good morning" $FontBody (New-Object System.Drawing.SolidBrush $BlueLight) 20 50
    Draw-Text $g "Find your hostel" $FontTitle (New-Object System.Drawing.SolidBrush $White) 20 72
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(40,255,255,255))) 20 120 350 36 14
    Draw-Text $g "JKUAT, Juja" $FontSmall (New-Object System.Drawing.SolidBrush $BlueLight) 36 130
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $White) 20 168 290 44 14
    Draw-Text $g "Search hostels, locations..." $FontBody (New-Object System.Drawing.SolidBrush $Gray) 50 182
    $cats = @("All","Nearby","Budget","Premium","Single","Shared")
    $cx = 20
    foreach ($cat in $cats) {
        $active = $cat -eq "All"
        $b = if ($active) { $Primary } else { $White }
        Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $b) $cx 230 58 30 15
        $tc = if ($active) { $White } else { $Muted }
        Draw-Text $g $cat $FontSmall (New-Object System.Drawing.SolidBrush $tc) ($cx+10) 238
        $cx += 62
    }
    Draw-Text $g "Featured Hostels" $FontH1 (New-Object System.Drawing.SolidBrush $Dark) 20 280
    Draw-HostelCard $g 20 310 "Juja Student Residence" "Juja, Kiambu" "8,500" "4.8"
    Draw-Text $g "Hostels near JKUAT" $FontH1 (New-Object System.Drawing.SolidBrush $Dark) 20 420
    Draw-Text $g "3 found" $FontBody (New-Object System.Drawing.SolidBrush $Muted) 300 424
    Draw-HostelCard $g 20 450 "Juja Student Residence" "Juja, Kiambu" "8,500" "4.8"
    Draw-HostelCard $g 20 550 "Juja Campus Hostel" "Githurai, Juja" "5,500" "4.3"
    Draw-TabBar $g
    Save-Bitmap $bmp "04-home.png"
}

# 5. Favorites
& {
    $bmp = New-Object System.Drawing.Bitmap $W, $H
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = "AntiAlias"
    $g.FillRectangle((New-Object System.Drawing.SolidBrush $Bg), 0, 0, $W, $H)
    Draw-GradientHeader $g 140
    Draw-Text $g "Saved Hostels" $FontTitle (New-Object System.Drawing.SolidBrush $White) 20 55
    Draw-Text $g "2 hostels saved" $FontBody (New-Object System.Drawing.SolidBrush $BlueLight) 20 90
    Draw-HostelCard $g 20 160 "Nairobi Student Residence" "Westlands, Nairobi" "8,500" "4.8"
    Draw-HostelCard $g 20 265 "Juja Student Residence" "Juja, Kiambu" "8,500" "4.8"
    Draw-TabBar $g
    $g.FillEllipse((New-Object System.Drawing.SolidBrush $Primary), 112, $H-56, 10, 10)
    Save-Bitmap $bmp "05-favorites.png"
}

# 6. Bookings
& {
    $bmp = New-Object System.Drawing.Bitmap $W, $H
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = "AntiAlias"
    $g.FillRectangle((New-Object System.Drawing.SolidBrush $Bg), 0, 0, $W, $H)
    Draw-GradientHeader $g 140
    Draw-Text $g "My Bookings" $FontTitle (New-Object System.Drawing.SolidBrush $White) 20 55
    Draw-Text $g "Track your reservations" $FontBody (New-Object System.Drawing.SolidBrush $BlueLight) 20 90
    $brush = New-Object System.Drawing.SolidBrush $White
    Draw-RoundedRect $g $brush 20 160 350 200 20
    $imgBrush = New-Object System.Drawing.SolidBrush (New-Color "dbeafe")
    $g.FillRectangle($imgBrush, 20, 160, 350, 120)
    Draw-Text $g "Nairobi Student Residence" $FontH2 (New-Object System.Drawing.SolidBrush $Dark) 32 290
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush (New-Color "dcfce7")) 270 290 80 24 12
    Draw-Text $g "Active" $FontSmall (New-Object System.Drawing.SolidBrush $Green) 290 296
    Draw-Text $g "Jan 2026 - Jun 2026" $FontSmall (New-Object System.Drawing.SolidBrush $Muted) 32 318
    Draw-Text $g "Ref: BK-2026-00892" $FontSmall (New-Object System.Drawing.SolidBrush $Muted) 32 340
    Draw-Text $g "KSh 51,000" $FontH2 (New-Object System.Drawing.SolidBrush $Primary) 260 340
    Draw-TabBar $g
    Save-Bitmap $bmp "06-bookings.png"
}

# 7. Profile
& {
    $bmp = New-Object System.Drawing.Bitmap $W, $H
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = "AntiAlias"
    $g.FillRectangle((New-Object System.Drawing.SolidBrush $Bg), 0, 0, $W, $H)
    Draw-GradientHeader $g 180
    $g.FillEllipse((New-Object System.Drawing.SolidBrush $White), 145, 50, 100, 100)
    Draw-Text $g "EO" (New-Object System.Drawing.Font("Segoe UI Semibold", 32)) (New-Object System.Drawing.SolidBrush $Primary) 168 78
    Draw-Text $g "Eben-Ezer Olame" $FontTitle (New-Object System.Drawing.SolidBrush $White) 90 165
    Draw-Text $g "eben@students.ac.ke" $FontBody (New-Object System.Drawing.SolidBrush $BlueLight) 105 198
    $items = @("University of Nairobi", "+254 712 345 678", "Edit Profile", "Settings", "Help and Support", "Logout")
    $y = 220
    foreach ($item in $items) {
        Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $White) 20 $y 350 52 14
        Draw-Text $g $item $FontBody (New-Object System.Drawing.SolidBrush $Dark) 36 ($y+16)
        $y += 62
    }
    Draw-TabBar $g
    Save-Bitmap $bmp "07-profile.png"
}

# 8. Hostel Details
& {
    $bmp = New-Object System.Drawing.Bitmap $W, $H
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = "AntiAlias"
    $g.FillRectangle((New-Object System.Drawing.SolidBrush $Bg), 0, 0, $W, $H)
    $imgBrush = New-Object System.Drawing.SolidBrush (New-Color "93c5fd")
    $g.FillRectangle($imgBrush, 0, 0, $W, 280)
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(230,255,255,255))) 20 50 40 40 20
    Draw-Text $g "<" $FontH1 (New-Object System.Drawing.SolidBrush $Dark) 32 58
    Draw-Text $g "Juja Student Residence" (New-Object System.Drawing.Font("Segoe UI Semibold", 20)) (New-Object System.Drawing.SolidBrush $Dark) 20 300
    Draw-Text $g "Juja, Kiambu" $FontBody (New-Object System.Drawing.SolidBrush $Muted) 20 332
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush (New-Color "fef3c7")) 280 300 80 30 12
    Draw-Text $g "* 4.8 (87)" $FontSmall (New-Object System.Drawing.SolidBrush $Dark) 290 308
    $stats = @("0.4 km from JKUAT", "Single Room", "Available")
    $sx = 20
    foreach ($s in $stats) {
        Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $White) $sx 370 108 56 14
        Draw-Text $g $s $FontSmall (New-Object System.Drawing.SolidBrush $Dark) ($sx+8) 392 92
        $sx += 116
    }
    Draw-Text $g "About" $FontH1 (New-Object System.Drawing.SolidBrush $Dark) 20 450
    Draw-Text $g "Student Residence near JKUAT in Juja, Kiambu. Safe, student-friendly accommodation with easy campus access." $FontBody (New-Object System.Drawing.SolidBrush $Muted) 20 478 350
    Draw-Text $g "Amenities" $FontH1 (New-Object System.Drawing.SolidBrush $Dark) 20 540
    $amenities = @("Wi-Fi", "Security", "Kitchen", "Laundry")
    $ax = 20; $ay = 570
    foreach ($a in $amenities) {
        Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $White) $ax $ay 100 34 10
        Draw-Text $g $a $FontSmall (New-Object System.Drawing.SolidBrush $Dark) ($ax+8) ($ay+8)
        $ax += 108
    }
    $g.FillRectangle((New-Object System.Drawing.SolidBrush $White), 0, $H-90, $W, 90)
    Draw-Text $g "KSh 8,500" (New-Object System.Drawing.Font("Segoe UI Semibold", 22)) (New-Object System.Drawing.SolidBrush $Dark) 20 ($H-70)
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $Primary) 210 ($H-78) 160 48 14
    Draw-Text $g "Book Now" $FontBtn (New-Object System.Drawing.SolidBrush $White) 245 ($H-62)
    Save-Bitmap $bmp "08-hostel-details.png"
}

# 9. Booking
& {
    $bmp = New-Object System.Drawing.Bitmap $W, $H
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = "AntiAlias"
    $g.FillRectangle((New-Object System.Drawing.SolidBrush $Bg), 0, 0, $W, $H)
    Draw-GradientHeader $g 120
    Draw-Text $g "Book Hostel" $FontTitle (New-Object System.Drawing.SolidBrush $White) 20 55
    Draw-Text $g "Juja Student Residence" $FontBody (New-Object System.Drawing.SolidBrush $BlueLight) 20 88
    Draw-InputField $g 20 150 "Room Type" "Single Room" ""
    Draw-InputField $g 20 240 "Move-in Date" "2026-07-01" ""
    Draw-InputField $g 20 330 "Duration" "6 months" ""
    Draw-InputField $g 20 420 "Full Name" "Eben-Ezer Olame" ""
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $White) 20 520 350 80 16
    Draw-Text $g "Total Price" $FontBody (New-Object System.Drawing.SolidBrush $Muted) 36 535
    Draw-Text $g "KSh 51,000" (New-Object System.Drawing.Font("Segoe UI Semibold", 24)) (New-Object System.Drawing.SolidBrush $Primary) 36 558
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $Primary) 20 630 350 52 16
    Draw-Text $g "Confirm Booking" $FontBtn (New-Object System.Drawing.SolidBrush $White) 115 646
    Save-Bitmap $bmp "09-booking.png"
}

# 10. Location Picker
& {
    $bmp = New-Object System.Drawing.Bitmap $W, $H
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = "AntiAlias"
    $g.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(100,0,0,0))), 0, 0, $W, $H)
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $Bg) 0 200 $W 644 30
    Draw-Text $g "Choose Location" $FontTitle (New-Object System.Drawing.SolidBrush $Dark) 20 230
    Draw-Text $g "Select your university campus" $FontBody (New-Object System.Drawing.SolidBrush $Muted) 20 262
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $White) 20 290 350 44 14
    Draw-Text $g "Search university or city..." $FontBody (New-Object System.Drawing.SolidBrush $Gray) 50 304
    Draw-Text $g "KIAMBU (4)" $FontSmall (New-Object System.Drawing.SolidBrush $Muted) 20 350
    $unis = @("JKUAT", "Mount Kenya University", "Kenyatta University")
    $uy = 370
    foreach ($u in $unis) {
        $sel = $u -eq "JKUAT"
        $b = if ($sel) { (New-Color "eff6ff") } else { $White }
        Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $b) 20 $uy 350 56 14
        Draw-Text $g $u $FontH2 (New-Object System.Drawing.SolidBrush $Dark) 60 ($uy+10)
        Draw-Text $g "Juja, Kiambu - Public" $FontSmall (New-Object System.Drawing.SolidBrush $Muted) 60 ($uy+32)
        if ($sel) { Draw-Text $g "OK" $FontSmall (New-Object System.Drawing.SolidBrush $Primary) 320 ($uy+18) }
        $uy += 64
    }
    Save-Bitmap $bmp "10-location-picker.png"
}

# 11. Budget filter
& {
    $bmp = New-Object System.Drawing.Bitmap $W, $H
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = "AntiAlias"
    $g.FillRectangle((New-Object System.Drawing.SolidBrush $Bg), 0, 0, $W, $H)
    Draw-GradientHeader $g 210
    Draw-Text $g "Find your hostel" $FontTitle (New-Object System.Drawing.SolidBrush $White) 20 72
    $cats = @("All","Nearby","Budget","Premium","Single","Shared")
    $cx = 20
    foreach ($cat in $cats) {
        $active = $cat -eq "Budget"
        $b = if ($active) { $Primary } else { $White }
        Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $b) $cx 230 58 30 15
        $tc = if ($active) { $White } else { $Muted }
        Draw-Text $g $cat $FontSmall (New-Object System.Drawing.SolidBrush $tc) ($cx+8) 238
        $cx += 62
    }
    Draw-Text $g "All Hostels in Kenya" $FontH1 (New-Object System.Drawing.SolidBrush $Dark) 20 290
    Draw-Text $g "48 found" $FontBody (New-Object System.Drawing.SolidBrush $Muted) 300 294
    Draw-HostelCard $g 20 320 "Juja Campus Hostel" "Githurai, Juja" "5,500" "4.3"
    Draw-HostelCard $g 20 425 "Nairobi Campus Hostel" "Ngara, Nairobi" "5,500" "4.3"
    Draw-TabBar $g
    Save-Bitmap $bmp "11-home-budget-filter.png"
}

# 12. Login error
& {
    $bmp = New-Object System.Drawing.Bitmap $W, $H
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = "AntiAlias"
    $g.FillRectangle((New-Object System.Drawing.SolidBrush $Bg), 0, 0, $W, $H)
    Draw-GradientHeader $g 200
    Draw-InputField $g 24 220 "Email Address" "bad@test.com" ""
    Draw-InputField $g 24 310 "Password" "123" ""
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $Primary) 24 410 342 52 16
    Draw-Text $g "Sign In" $FontBtn (New-Object System.Drawing.SolidBrush $White) 165 426
    $g.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(120,0,0,0))), 0, 0, $W, $H)
    Draw-RoundedRect $g (New-Object System.Drawing.SolidBrush $White) 40 320 310 130 20
    Draw-Text $g "Login failed" $FontH1 (New-Object System.Drawing.SolidBrush $Dark) 60 345
    Draw-Text $g "Please enter a valid email and password (min 6 characters)." $FontBody (New-Object System.Drawing.SolidBrush $Muted) 60 378
    Draw-Text $g "OK" $FontBtn (New-Object System.Drawing.SolidBrush $Primary) 170 420
    Save-Bitmap $bmp "12-login-error.png"
}

# Evidence screenshots
function Save-Evidence($title, $content, $filename) {
    $lineCount = ($content -split "`n").Count
    $height = [Math]::Min(700, 80 + ($lineCount * 18))
    $bmp = New-Object System.Drawing.Bitmap(920, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.FillRectangle((New-Object System.Drawing.SolidBrush (New-Color "1e1e1e")), 0, 0, 920, $bmp.Height)
    Draw-Text $g $title (New-Object System.Drawing.Font("Segoe UI Semibold", 14)) (New-Object System.Drawing.SolidBrush (New-Color "4fc3f7")) 20 15
    Draw-Text $g $content (New-Object System.Drawing.Font("Consolas", 10)) (New-Object System.Drawing.SolidBrush (New-Color "d4d4d4")) 20 45 880
    $path = Join-Path $OutEvidence $filename
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Saved evidence/$filename"
}

Push-Location $Root
try {
    $tsc = & npx tsc --noEmit 2>&1 | Out-String
} catch { $tsc = $_.Exception.Message }
Pop-Location
Save-Evidence "TypeScript Check - npx tsc --noEmit" $tsc.Trim() "tsc-check.png"

$envInfo = @(
    (node -v 2>&1)
    "npm $(npm -v 2>&1)"
    "expo $(npx expo --version 2>&1)"
) -join "`n"
Save-Evidence "Development Environment Versions" $envInfo "environment.png"

Push-Location $Root
try {
    $git = & git log --oneline -8 2>&1 | Out-String
} catch { $git = "Git history not available in this workspace." }
Pop-Location
Save-Evidence "Git Commit History" $git.Trim() "git-commits.png"

$codeFiles = @(
    @("Service Layer - hostelService.ts", "services/hostelService.ts", "hostel-service.png"),
    @("Local Data - universities.ts", "data/universities.ts", "data-universities.png"),
    @("CRUD - bookingService.ts", "services/bookingService.ts", "booking-service.png")
)
foreach ($item in $codeFiles) {
    $title, $file, $out = $item
    $content = Get-Content (Join-Path $Root $file) -TotalCount 28 -ErrorAction SilentlyContinue | Out-String
    if ($content) { Save-Evidence "$title ($file)" $content.Trim() $out }
}

Write-Host "`nAll screenshots saved to $OutApp"
