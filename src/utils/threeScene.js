import * as THREE from 'three'

export class ThreeScene {
  constructor(container) {
    this.container = container
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    this.init()
  }

  init() {
    // Setup renderer
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
    this.renderer.setClearColor(0x000000, 0)
    this.container.appendChild(this.renderer.domElement)

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    this.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    this.scene.add(directionalLight)

    // Create a pill object
    this.createPill()

    // Position camera
    this.camera.position.z = 5

    // Start animation
    this.animate()
  }

  createPill() {
    // Pill geometry (capsule shape)
    const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 4, 8)
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x3a86ff,
      shininess: 100 
    })
    
    this.pill = new THREE.Mesh(capsuleGeometry, material)
    this.scene.add(this.pill)
  }

  animate() {
    requestAnimationFrame(() => this.animate())

    if (this.pill) {
      this.pill.rotation.x += 0.01
      this.pill.rotation.y += 0.01
    }

    this.renderer.render(this.scene, this.camera)
  }

  resize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
  }

  cleanup() {
    this.renderer.dispose()
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement)
    }
  }
}