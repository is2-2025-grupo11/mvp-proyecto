import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="COMUARENAL"
                width={50}
                height={50}
                className="rounded-full bg-card"
              />
              <div>
                <p className="font-bold text-lg">COMUARENAL</p>
                <p className="text-xs text-background/60">Cooperativa Multiactiva</p>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              Transformamos las mejores frutas en productos artesanales de alta calidad 
              para llevar sabor a tu hogar.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Enlaces Rapidos</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#inicio" className="text-sm text-background/70 hover:text-background transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#nosotros" className="text-sm text-background/70 hover:text-background transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-sm text-background/70 hover:text-background transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-sm text-background/70 hover:text-background transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Productos</h4>
            <ul className="space-y-3">
              {["Ajies", "Encurtidos", "Mermeladas", "Salsas"].map((item) => (
                <li key={item}>
                  <Link
                    href="/productos"
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li>Arenal, Bolivar, Colombia</li>
              <li>+57 300 123 4567</li>
              <li>contacto@comuarenal.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            &copy; {new Date().getFullYear()} COMUARENAL. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-background/60 hover:text-background">
              Terminos
            </Link>
            <Link href="#" className="text-sm text-background/60 hover:text-background">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
