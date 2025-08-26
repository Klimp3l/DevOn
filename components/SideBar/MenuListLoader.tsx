export default function MenuListLoader() {
    return (
        <div className="p-3 sm:p-4 space-y-2">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="h-8 sm:h-10 bg-gray-200 rounded-lg animate-pulse"
                    style={{
                        animationDelay: `${i * 100}ms`
                    }}
                />
            ))}
        </div>
    )
}