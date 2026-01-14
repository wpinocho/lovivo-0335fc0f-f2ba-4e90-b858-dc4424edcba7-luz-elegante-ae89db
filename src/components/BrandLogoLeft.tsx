export const BrandLogoLeft = () => {
  return (
    <a href="/" aria-label="Home" className="flex items-center group">
      <img 
        src="/logo.png"
        alt="Spectrum"
        className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl font-bold bg-gradient-spectrum bg-clip-text text-transparent">Spectrum</span>';
        }}
      />
    </a>
  )
}