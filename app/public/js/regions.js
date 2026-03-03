// SVG region data for the interactive body map.
// Coordinates are percentages of the image container dimensions.
// Each region maps to clickable muscle zones on front/back views.

export const regions = [
  // ========== FRONT VIEW ==========

  // Neck / Front of throat
  {
    id: 'neck_front',
    view: 'front',
    name: 'Neck (Front)',
    muscles: ['SCM', 'Scalenes', 'Deep neck flexors'],
    deviations: ['Forward Head Posture', 'Upper Crossed Syndrome', 'Shoulder Elevation'],
    points: '46,11.5 54,11.5 54.5,14.5 45.5,14.5'
  },

  // Left Shoulder / Deltoid
  {
    id: 'left_shoulder_front',
    view: 'front',
    name: 'Left Shoulder',
    muscles: ['Anterior deltoid', 'Upper trapezius'],
    deviations: ['Rounded Shoulders', 'Upper Crossed Syndrome', 'Shoulder Elevation'],
    points: '37,15 44,14.5 44.5,20 38.5,21'
  },

  // Right Shoulder / Deltoid
  {
    id: 'right_shoulder_front',
    view: 'front',
    name: 'Right Shoulder',
    muscles: ['Anterior deltoid', 'Upper trapezius'],
    deviations: ['Rounded Shoulders', 'Upper Crossed Syndrome', 'Shoulder Elevation'],
    points: '56,14.5 63,15 61.5,21 55.5,20'
  },

  // Chest / Pectorals
  {
    id: 'chest',
    view: 'front',
    name: 'Chest',
    muscles: ['Pectoralis major', 'Pectoralis minor'],
    deviations: ['Rounded Shoulders', 'Upper Crossed Syndrome', 'Kyphosis'],
    points: '44.5,17 55.5,17 56,27 44,27'
  },

  // Left Upper Arm / Bicep
  {
    id: 'left_upper_arm_front',
    view: 'front',
    name: 'Left Upper Arm',
    muscles: ['Biceps brachii', 'Brachialis'],
    deviations: [],
    points: '35,22 38.5,21 39.5,33 36,34'
  },

  // Right Upper Arm / Bicep
  {
    id: 'right_upper_arm_front',
    view: 'front',
    name: 'Right Upper Arm',
    muscles: ['Biceps brachii', 'Brachialis'],
    deviations: [],
    points: '61.5,21 65,22 64,34 60.5,33'
  },

  // Left Forearm
  {
    id: 'left_forearm_front',
    view: 'front',
    name: 'Left Forearm',
    muscles: ['Wrist flexors', 'Pronators'],
    deviations: [],
    points: '33.5,35 36,34 37.5,46 34.5,46.5'
  },

  // Right Forearm
  {
    id: 'right_forearm_front',
    view: 'front',
    name: 'Right Forearm',
    muscles: ['Wrist flexors', 'Pronators'],
    deviations: [],
    points: '64,34 66.5,35 65.5,46.5 62.5,46'
  },

  // Abs / Core
  {
    id: 'abs',
    view: 'front',
    name: 'Core / Abdominals',
    muscles: ['Rectus abdominis', 'Transverse abdominis', 'Internal oblique', 'External oblique'],
    deviations: ['Anterior Pelvic Tilt', 'Posterior Pelvic Tilt', 'Lumbar Hyperextension', 'Kyphosis'],
    points: '44,27 56,27 56.5,40 43.5,40'
  },

  // Left Hip Flexor
  {
    id: 'left_hip_flexor',
    view: 'front',
    name: 'Left Hip Flexor',
    muscles: ['Iliopsoas', 'Rectus femoris (proximal)', 'TFL'],
    deviations: ['Anterior Pelvic Tilt', 'Lumbar Hyperextension'],
    points: '43.5,40 48,40 47,49 42,49'
  },

  // Right Hip Flexor
  {
    id: 'right_hip_flexor',
    view: 'front',
    name: 'Right Hip Flexor',
    muscles: ['Iliopsoas', 'Rectus femoris (proximal)', 'TFL'],
    deviations: ['Anterior Pelvic Tilt', 'Lumbar Hyperextension'],
    points: '52,40 56.5,40 58,49 53,49'
  },

  // Left Quad
  {
    id: 'left_quad',
    view: 'front',
    name: 'Left Quadriceps',
    muscles: ['Rectus femoris', 'Vastus lateralis', 'Vastus medialis', 'Vastus intermedius'],
    deviations: ['Anterior Pelvic Tilt', 'Knee Valgus'],
    points: '42,49 48,49 48.5,68 42.5,68'
  },

  // Right Quad
  {
    id: 'right_quad',
    view: 'front',
    name: 'Right Quadriceps',
    muscles: ['Rectus femoris', 'Vastus lateralis', 'Vastus medialis', 'Vastus intermedius'],
    deviations: ['Anterior Pelvic Tilt', 'Knee Valgus'],
    points: '52,49 58,49 57.5,68 51.5,68'
  },

  // Left Shin / Anterior lower leg
  {
    id: 'left_shin',
    view: 'front',
    name: 'Left Shin',
    muscles: ['Tibialis anterior', 'Peroneals'],
    deviations: ['Foot Pronation', 'Knee Valgus'],
    points: '43,69 48.5,69 48,85 44,85'
  },

  // Right Shin / Anterior lower leg
  {
    id: 'right_shin',
    view: 'front',
    name: 'Right Shin',
    muscles: ['Tibialis anterior', 'Peroneals'],
    deviations: ['Foot Pronation', 'Knee Valgus'],
    points: '51.5,69 57,69 56,85 52,85'
  },

  // Left Inner Thigh / Adductors
  {
    id: 'left_adductors',
    view: 'front',
    name: 'Left Inner Thigh',
    muscles: ['Adductor complex', 'Gracilis'],
    deviations: ['Knee Valgus'],
    points: '48,49 50,49 50,65 48.5,65'
  },

  // Right Inner Thigh / Adductors
  {
    id: 'right_adductors',
    view: 'front',
    name: 'Right Inner Thigh',
    muscles: ['Adductor complex', 'Gracilis'],
    deviations: ['Knee Valgus'],
    points: '50,49 52,49 51.5,65 50,65'
  },

  // ========== BACK VIEW ==========

  // Neck / Suboccipitals (back)
  {
    id: 'neck_back',
    view: 'back',
    name: 'Neck (Back)',
    muscles: ['Suboccipitals', 'Upper cervical extensors', 'Levator scapulae'],
    deviations: ['Forward Head Posture', 'Upper Crossed Syndrome', 'Shoulder Elevation'],
    points: '46,10 54,10 54.5,14.5 45.5,14.5'
  },

  // Left Upper Trap
  {
    id: 'left_upper_trap',
    view: 'back',
    name: 'Left Upper Trapezius',
    muscles: ['Upper trapezius', 'Levator scapulae'],
    deviations: ['Forward Head Posture', 'Shoulder Elevation', 'Upper Crossed Syndrome'],
    points: '38,15.5 46,14.5 45.5,20 40,20.5'
  },

  // Right Upper Trap
  {
    id: 'right_upper_trap',
    view: 'back',
    name: 'Right Upper Trapezius',
    muscles: ['Upper trapezius', 'Levator scapulae'],
    deviations: ['Forward Head Posture', 'Shoulder Elevation', 'Upper Crossed Syndrome'],
    points: '54,14.5 62,15.5 60,20.5 54.5,20'
  },

  // Mid Back / Rhomboids + Mid Trap
  {
    id: 'mid_back',
    view: 'back',
    name: 'Mid Back',
    muscles: ['Mid trapezius', 'Rhomboids', 'Thoracic erector spinae'],
    deviations: ['Rounded Shoulders', 'Kyphosis', 'Upper Crossed Syndrome'],
    points: '43,20 57,20 57,31 43,31'
  },

  // Left Lat
  {
    id: 'left_lat',
    view: 'back',
    name: 'Left Lat',
    muscles: ['Latissimus dorsi'],
    deviations: ['Rounded Shoulders', 'Anterior Pelvic Tilt', 'Kyphosis'],
    points: '38,21 43,20 43,35 39,36'
  },

  // Right Lat
  {
    id: 'right_lat',
    view: 'back',
    name: 'Right Lat',
    muscles: ['Latissimus dorsi'],
    deviations: ['Rounded Shoulders', 'Anterior Pelvic Tilt', 'Kyphosis'],
    points: '57,20 62,21 61,36 57,35'
  },

  // Lower Back
  {
    id: 'lower_back',
    view: 'back',
    name: 'Lower Back',
    muscles: ['Erector spinae (lumbar)', 'Quadratus lumborum', 'Multifidus'],
    deviations: ['Anterior Pelvic Tilt', 'Lumbar Hyperextension', 'Posterior Pelvic Tilt'],
    points: '43,31 57,31 57.5,41 42.5,41'
  },

  // Left Glute
  {
    id: 'left_glute',
    view: 'back',
    name: 'Left Glute',
    muscles: ['Gluteus maximus', 'Gluteus medius', 'Deep external rotators'],
    deviations: ['Anterior Pelvic Tilt', 'Knee Valgus', 'Posterior Pelvic Tilt'],
    points: '42,41 50,41 50,51 41.5,51'
  },

  // Right Glute
  {
    id: 'right_glute',
    view: 'back',
    name: 'Right Glute',
    muscles: ['Gluteus maximus', 'Gluteus medius', 'Deep external rotators'],
    deviations: ['Anterior Pelvic Tilt', 'Knee Valgus', 'Posterior Pelvic Tilt'],
    points: '50,41 58,41 58.5,51 50,51'
  },

  // Left Hamstring
  {
    id: 'left_hamstring',
    view: 'back',
    name: 'Left Hamstring',
    muscles: ['Biceps femoris', 'Semitendinosus', 'Semimembranosus'],
    deviations: ['Posterior Pelvic Tilt', 'Knee Valgus'],
    points: '42,51 50,51 49.5,69 43,69'
  },

  // Right Hamstring
  {
    id: 'right_hamstring',
    view: 'back',
    name: 'Right Hamstring',
    muscles: ['Biceps femoris', 'Semitendinosus', 'Semimembranosus'],
    deviations: ['Posterior Pelvic Tilt', 'Knee Valgus'],
    points: '50,51 58,51 57,69 50.5,69'
  },

  // Left Calf
  {
    id: 'left_calf',
    view: 'back',
    name: 'Left Calf',
    muscles: ['Gastrocnemius', 'Soleus'],
    deviations: ['Foot Pronation'],
    points: '43.5,70 49.5,70 48.5,86 44.5,86'
  },

  // Right Calf
  {
    id: 'right_calf',
    view: 'back',
    name: 'Right Calf',
    muscles: ['Gastrocnemius', 'Soleus'],
    deviations: ['Foot Pronation'],
    points: '50.5,70 56.5,70 55.5,86 51.5,86'
  },

  // Left Rear Shoulder
  {
    id: 'left_shoulder_back',
    view: 'back',
    name: 'Left Rear Shoulder',
    muscles: ['Posterior deltoid', 'Infraspinatus', 'Teres minor', 'Teres major'],
    deviations: ['Rounded Shoulders', 'Upper Crossed Syndrome'],
    points: '37.5,15.5 40,20.5 38.5,24 35.5,22'
  },

  // Right Rear Shoulder
  {
    id: 'right_shoulder_back',
    view: 'back',
    name: 'Right Rear Shoulder',
    muscles: ['Posterior deltoid', 'Infraspinatus', 'Teres minor', 'Teres major'],
    deviations: ['Rounded Shoulders', 'Upper Crossed Syndrome'],
    points: '60,20.5 62.5,15.5 64.5,22 61.5,24'
  }
];

// Deviation definitions with associated region auto-selection
export const deviations = [
  {
    id: 'forward_head',
    name: 'Forward Head Posture',
    description: 'Head sits forward of shoulders, chin pokes out',
    autoSelect: ['neck_front', 'neck_back', 'left_upper_trap', 'right_upper_trap'],
    overactive: ['Suboccipitals', 'SCM', 'Upper trapezius', 'Levator scapulae'],
    underactive: ['Deep neck flexors', 'Lower trapezius', 'Serratus anterior']
  },
  {
    id: 'rounded_shoulders',
    name: 'Rounded Shoulders',
    description: 'Shoulders roll forward, chest appears concave',
    autoSelect: ['chest', 'left_shoulder_front', 'right_shoulder_front', 'mid_back', 'left_lat', 'right_lat'],
    overactive: ['Pectoralis major', 'Pectoralis minor', 'Latissimus dorsi', 'Teres major'],
    underactive: ['Mid trapezius', 'Lower trapezius', 'Rhomboids', 'Rotator cuff external rotators']
  },
  {
    id: 'upper_crossed',
    name: 'Upper Crossed Syndrome',
    description: 'Forward head + rounded shoulders combined',
    autoSelect: ['neck_front', 'neck_back', 'chest', 'left_upper_trap', 'right_upper_trap', 'mid_back', 'left_shoulder_front', 'right_shoulder_front'],
    overactive: ['Suboccipitals', 'SCM', 'Upper trapezius', 'Levator scapulae', 'Pectoralis major', 'Pectoralis minor', 'Latissimus dorsi'],
    underactive: ['Deep neck flexors', 'Lower trapezius', 'Mid trapezius', 'Rhomboids', 'Rotator cuff ERs', 'Serratus anterior']
  },
  {
    id: 'anterior_pelvic_tilt',
    name: 'Anterior Pelvic Tilt',
    description: 'Pelvis tips forward, low back arches excessively',
    autoSelect: ['left_hip_flexor', 'right_hip_flexor', 'lower_back', 'left_quad', 'right_quad', 'abs', 'left_glute', 'right_glute', 'left_hamstring', 'right_hamstring'],
    overactive: ['Hip flexor complex', 'Erector spinae (lumbar)', 'Latissimus dorsi', 'TFL'],
    underactive: ['Gluteus maximus', 'Hamstrings', 'Transverse abdominis', 'Multifidus']
  },
  {
    id: 'posterior_pelvic_tilt',
    name: 'Posterior Pelvic Tilt',
    description: 'Pelvis tucks under, low back flattens',
    autoSelect: ['left_hamstring', 'right_hamstring', 'abs', 'left_glute', 'right_glute', 'lower_back', 'left_hip_flexor', 'right_hip_flexor'],
    overactive: ['Hamstrings', 'Rectus abdominis', 'External obliques'],
    underactive: ['Hip flexors (iliopsoas)', 'Erector spinae (lumbar)', 'Quadratus lumborum']
  },
  {
    id: 'kyphosis',
    name: 'Kyphosis',
    description: 'Excessive rounding of the upper back',
    autoSelect: ['chest', 'mid_back', 'left_lat', 'right_lat', 'abs'],
    overactive: ['Pectoralis minor', 'Pectoralis major', 'Upper abdominals', 'Latissimus dorsi'],
    underactive: ['Thoracic erector spinae', 'Lower trapezius', 'Mid trapezius', 'Rhomboids']
  },
  {
    id: 'lumbar_hyperextension',
    name: 'Lumbar Hyperextension',
    description: 'Excessive arching in the lower back during movement',
    autoSelect: ['lower_back', 'left_hip_flexor', 'right_hip_flexor', 'abs', 'left_glute', 'right_glute'],
    overactive: ['Erector spinae (lumbar)', 'Hip flexor complex', 'Latissimus dorsi'],
    underactive: ['Transverse abdominis', 'Internal oblique', 'Gluteus maximus']
  },
  {
    id: 'knee_valgus',
    name: 'Knee Valgus',
    description: 'Knees collapse inward during movement',
    autoSelect: ['left_adductors', 'right_adductors', 'left_quad', 'right_quad', 'left_glute', 'right_glute'],
    overactive: ['Adductor complex', 'TFL', 'Vastus lateralis', 'Biceps femoris (short head)'],
    underactive: ['Gluteus medius', 'Gluteus maximus', 'VMO']
  },
  {
    id: 'foot_pronation',
    name: 'Foot Pronation',
    description: 'Feet roll inward excessively',
    autoSelect: ['left_shin', 'right_shin', 'left_calf', 'right_calf'],
    overactive: ['Peroneals', 'Lateral gastrocnemius', 'Biceps femoris (short head)'],
    underactive: ['Posterior tibialis', 'Medial gastrocnemius', 'Anterior tibialis']
  }
];
