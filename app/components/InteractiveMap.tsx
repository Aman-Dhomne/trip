"use client"

import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string

interface InteractiveMapProps {
  from: string
  to: string
}

export default function InteractiveMap({ from, to }: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [lng] = useState(78.9629)
  const [lat] = useState(20.5937)
  const [zoom] = useState(4)

  useEffect(() => {
    console.log("Map Container:", mapContainer.current)
    if (map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    })
  }, [lng, lat, zoom])

  useEffect(() => {
    try {
      if (map.current) return // Initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
      })
    } catch (error) {
      console.error("Error initializing Mapbox:", error)
    }
  }, [lng, lat, zoom])
  

  useEffect(() => {
    if (!map.current || !from || !to) return

    const drawRoute = async () => {
      try {
        const fromCoords = await getCoordinates(from)
        const toCoords = await getCoordinates(to)

        if (fromCoords && toCoords) {
          map.current!.fitBounds([fromCoords, toCoords], { padding: 50 })

          map.current!.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [fromCoords, toCoords]
              }
            }
          })

          map.current!.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#888',
              'line-width': 8
            }
          })

          new mapboxgl.Marker().setLngLat(fromCoords).addTo(map.current!)
          new mapboxgl.Marker().setLngLat(toCoords).addTo(map.current!)
        }
      } catch (error) {
        console.error('Error drawing route:', error)
      }
    }

    drawRoute()
  }, [from, to])

  return <div ref={mapContainer} className="w-full h-96 rounded-lg" />

  console.log("Mapbox Access Token:", mapboxgl.accessToken)

}

async function getCoordinates(place: string): Promise<[number, number] | null> {
  try {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${mapboxgl.accessToken}`)
    const data = await response.json()
    if (data.features && data.features.length > 0) {
      return data.features[0].center as [number, number]
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error)
  }
  return null
}