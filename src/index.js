/* @jsx jsx */
import {jsx, css, Global} from '@emotion/core'

import React, {useRef, useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

let currentId = 1
const generateId = () => currentId++

function useMountedState() {
  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => (mountedRef.current = false)
  }, [])
  return mountedRef
}

function AudioSrc({
  playbackRate,
  playing,
  onEndedChange,
  onPlaying,
  onRemove,
  onChangeAudioSrc,
  src,
  index,
}) {
  const audioRef = useRef()
  const [ended, setEndedState] = useState(false)
  function handleEnded(e) {
    setEndedState(true)
  }
  function handlePlaying(e) {
    onPlaying(e)
    setEndedState(false)
  }
  useEffect(
    () => {
      if (mounted.current) {
        onEndedChange(ended)
      }
    },
    [ended],
  )
  const mounted = useMountedState()
  useEffect(
    () => {
      if (!audioRef.current) {
        return
      }
      audioRef.current.playbackRate = playbackRate
    },
    [playbackRate],
  )

  useEffect(
    () => {
      if (playing && audioRef.current.paused) {
        audioRef.current.play()
      }
    },
    [playing],
  )

  return (
    <div
      css={{
        opacity: ended ? 0.4 : null,
        marginBottom: 20,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #1d1075',
        padding: 20,
        borderRadius: 4,
        boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)`,
      }}
    >
      <div>
        {ended ? (
          <span role="img" aria-label="finished">
            ✅
          </span>
        ) : null}
        <label css={{lineHeight: 1.4}} htmlFor={`fileUrl-${index}`}>
          File {index + 1} URL
        </label>
        <button
          onClick={onRemove}
          css={{
            backgroundColor: 'transparent',
            border: 'none',
          }}
        >
          <span role="img" aria-label="remove">
            ❌
          </span>
        </button>
      </div>
      <input
        type="text"
        id={`fileUrl-${index}`}
        value={src}
        placeholder="Paste audio file url here"
        onChange={e => onChangeAudioSrc(e.target.value)}
        css={{
          padding: '4px 8px',
          borderRadius: 4,
          border: '2px solid #1d1075',
          marginBottom: 20,
        }}
      />
      <div css={{display: 'flex'}}>
        <button
          onClick={() => (audioRef.current.currentTime -= 10)}
          css={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
          }}
        >
          <span role="img" aria-label="go back 10 seconds">
            ⏪
          </span>
        </button>
        <audio
          controls={true}
          css={{width: '100%'}}
          ref={audioRef}
          src={src}
          onEnded={handleEnded}
          onPlaying={handlePlaying}
        />
        <button
          onClick={() => (audioRef.current.currentTime += 10)}
          css={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
          }}
        >
          <span role="img" aria-label="go forward 10 seconds">
            ⏩
          </span>
        </button>
      </div>
    </div>
  )
}

function App() {
  const [playbackRate, setPlaybackRate] = useState(1)
  const [playingEpisode, setPlayingEpisode] = useState(-1)
  const [audioSrces, setAudioSrces] = useState([
    {
      id: 0,
      src:
        'https://media.blubrry.com/writingexcuses/writingexcuses.com/wp-content/uploads/Writing_Excuses_10_2_I_Have_an_Idea.mp3',
    },
    {
      id: 10,
      src:
        'https://media.blubrry.com/writingexcuses/writingexcuses.com/wp-content/uploads/Writing_Excuses_10_2_I_Have_an_Idea.mp3',
    },
  ])

  function addSrc() {
    setAudioSrces(srces => [...srces, {src: '', id: generateId()}])
  }

  function setDataForAudio(index, data) {
    setAudioSrces(srces => [
      ...srces.slice(0, index),
      {...srces[index], ...data},
      ...srces.slice(index + 1),
    ])
  }

  function advanceEpisode(endedIndex) {
    const next = endedIndex + 1
    setDataForAudio(endedIndex, {played: true})
    setPlayingEpisode(next > audioSrces.length ? -1 : next)
  }

  function removeEpisode(index) {
    setAudioSrces(srces => srces.filter((s, i) => i !== index))
  }

  function setAudioSrc(index, newSrc) {
    setDataForAudio(index, {src: newSrc})
  }

  return (
    <div>
      <Global
        styles={css`
          body {
            font-family: 'Squada One', cursive;
          }
        `}
      />
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContents: 'center',
          maxWidth: 500,
          margin: 'auto',
        }}
      >
        <h1 css={{textAlign: 'center', fontSize: '3rem'}}>
          Audio Speeder{' '}
          <span
            role="img"
            aria-label="race car with a puff of smoke behind it"
            css={{display: 'inline-block', transform: 'scaleX(-1)'}}
          >
            🏎💨
          </span>
        </h1>

        <div css={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
          <label css={{marginRight: 20, lineHeight: 1.5}}>Playback Rate</label>
          <input
            type="number"
            min={0}
            max={5}
            step="0.1"
            value={playbackRate}
            onChange={e => setPlaybackRate(e.target.value)}
            css={{
              lineHeight: 1.5,
              fontSize: '1.2rem',
              padding: '6px 14px',
              borderRadius: 4,
              border: '2px solid #1d1075',
              marginRight: 10,
            }}
          />
          <input
            type="range"
            min={0}
            max={5}
            step="0.1"
            value={playbackRate}
            onChange={e => setPlaybackRate(e.target.value)}
            css={{flex: '1'}}
          />
        </div>
        {audioSrces.map((src, i) => (
          <AudioSrc
            playbackRate={playbackRate}
            onChangeAudioSrc={newSrc => setAudioSrc(i, newSrc)}
            key={src.id}
            {...src}
            index={i}
            playing={playingEpisode === i}
            onRemove={() => removeEpisode(i)}
            onPlaying={() => setPlayingEpisode(i)}
            onEndedChange={ended => {
              if (ended) {
                advanceEpisode(i)
              }
            }}
          />
        ))}
        <button
          type="button"
          onClick={addSrc}
          css={{
            marginTop: 20,
            borderRadius: 4,
            backgroundColor: '#1d1075',
            color: 'white',
            padding: 10,
            fontSize: '1.2rem',
            cursor: 'pointer',
            ':active,:hover,:focus': {
              opacity: 0.85,
            },
          }}
        >
          Add a URL to your playlist
        </button>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('🏎'))

/*
eslint
no-unused-vars: ["warn", {"varsIgnorePattern": "(jsx)"}]
react/react-in-jsx-scope: "off"
*/
